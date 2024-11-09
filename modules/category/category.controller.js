const { Category } = require('../../database/models/category.model');

/**
 * Get a single category by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: error.message
    });
  }
};

/**
 * Get all categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      message: "Success",
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message
    });
  }
};

module.exports = {
  getOneCategory,
  getAllCategories
};