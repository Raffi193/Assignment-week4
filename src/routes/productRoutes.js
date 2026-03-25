const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");

// POST /api/products → diteruskan ke controller createProduct
router.post("/", createProduct);

module.exports = router;