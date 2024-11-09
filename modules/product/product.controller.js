// modules/product/product.controller.js
const { Product } = require('../../database/models/product.model');

/**
 * Get all products with pagination, category filter, and search
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllProducts = async function (req, res) {
  try {
    const condition = {};
    const { category, keyword, page = 1, limit = 10 } = req.query;

    // Apply category filter if provided
    if (category) {
      condition.category = category;
    }

    // Apply search filter if keyword provided
    if (keyword) {
      condition.title = { $regex: ".*" + keyword + ".*", $options: "i" };
    }

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Fetch products with pagination
    const products = await Product.find(condition)
      // .populate("category")  // Uncomment if needed
      .limit(parseInt(limit))
      .skip(offset);

    // Get total count for pagination
    const total = await Product.countDocuments(condition);

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};

/**
 * Get a single product by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .select("title description price image rate highlight");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById
};