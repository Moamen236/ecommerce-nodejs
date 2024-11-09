// modules/category/category.router.js
const express = require('express');
const { getAllCategories, getOneCategory } = require('./category.controller');

const categoryRouter = express.Router();

categoryRouter.get('/getallcategories', getAllCategories);
categoryRouter.get('/getonecategory/:id', getOneCategory);

module.exports = categoryRouter;
