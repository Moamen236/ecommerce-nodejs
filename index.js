// index.js
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/dbConnection');
const productRouter = require('./modules/product/product.router');
const categoryRouter = require('./modules/category/category.router');

const app = express();

// Connect to database
dbConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app for LiteSpeed
module.exports = app;