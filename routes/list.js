const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const list = require('../controllers/list')
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
const List = require('../models/list')
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, catchAsync(list.showList))
    .post(isLoggedIn, catchAsync(products.addProductToList))


router.get('/increaseQuantity/:id', catchAsync(list.increaseQuantity));

router.get('/increaseWeight/:id', catchAsync(list.increaseWeight));


router.get('/decreaseQuantity/:id', catchAsync(list.decreaseQuantity));

router.get('/decreaseWeight/:id', catchAsync(list.decreaseWeight));

module.exports = router;