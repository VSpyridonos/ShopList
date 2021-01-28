const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const path = require('path');
const mongoose = require('mongoose');
const catchAsync = require('../utilities/catchAsync');
const methodOverride = require('method-override');
const Product = require('../models/product');
const Category = require('../models/category');
const Shop = require('../models/shop');
const Price = require('../models/price');
const Review = require('../models/review');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(products.index))
    .post(isLoggedIn, catchAsync(products.createProduct))
//.post(upload.array('image'))

router.get('/new', isLoggedIn, products.renderNewForm);

router.route('/:id')
    .get(catchAsync(products.showProduct))
    .put(isLoggedIn, catchAsync(products.updateProduct))
    .delete(isLoggedIn, catchAsync(products.deleteProduct))

router.get('/:id/edit', isLoggedIn, catchAsync(products.renderEditForm));

router.post('/list', catchAsync(products.addProductToList))

module.exports = router;