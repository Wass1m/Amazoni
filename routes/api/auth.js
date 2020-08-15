const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.response);
    res.status(500).send("SERVER ERROR");
  }
});

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at lest 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if users exists

      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }

      // id to sign

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };

      // jwtoken

      await jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // create a new user
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("SERVER ERROR");
    }
  }
);

module.exports = router;
