// modules/product/product.router.js
const express = require('express');
const { getAllProducts, getProductById } = require('./product.controller');

const productRouter = express.Router();

productRouter.get("/getallproducts", getAllProducts);
productRouter.get("/getoneproduct/:id", getProductById);

module.exports = productRouter;