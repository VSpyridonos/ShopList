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

router.get('/increaseWeightByALittle/:id', catchAsync(list.increaseWeightByALittle));

router.get('/increaseWeightByALot/:id', catchAsync(list.increaseWeightByALot));

router.get('/decreaseQuantity/:id', catchAsync(list.decreaseQuantity));

router.get('/decreaseWeightByALittle/:id', catchAsync(list.decreaseWeightByALittle));

router.get('/decreaseWeightByALot/:id', catchAsync(list.decreaseWeightByALot));

router.get('/removeProduct/:id', catchAsync(list.removeProduct));

module.exports = router;