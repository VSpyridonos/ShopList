const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const reviews = require('../controllers/reviews');
const Product = require('../models/product');
const Review = require('../models/review');


router.post('/', isLoggedIn, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;