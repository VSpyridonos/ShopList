const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const shops = require('../controllers/shops');
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


router.route('/')
    .get(catchAsync(shops.showMap))

router.get('/new', shops.createShop)

module.exports = router;