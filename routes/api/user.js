const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");

const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
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

    const { name, email, password } = req.body;

    try {
      // check if users exists

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        name,
        avatar,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // id to sign

      const payload = {
        user: {
          id: user.id,
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
