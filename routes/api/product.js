const express = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");

const Product = require("../../models/Product");
const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    return res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR");
  }
});

// get profile by id
// public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR");
  }
});

router.post("/", auth, isAdmin, async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    rating,
    numReviews,
  } = req.body;

  try {
    const product = new Product({
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      rating,
      numReviews,
    });

    await product.save();

    return res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR");
  }
});

module.exports = router;
