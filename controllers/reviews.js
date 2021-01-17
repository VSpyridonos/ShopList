const sanitizeHtml = require('sanitize-html');
const Product = require('../models/product');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    review.body = sanitizeHtml(review.body);
    product.reviews.unshift(review);
    review.author = req.user._id;
    await review.save();
    await product.save();
    req.flash('success', 'Η αξιολόγηση υποβλήθηκε επιτυχώς!');
    res.redirect(`/products/${product._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Η αξιολόγηση διαγράφηκε επιτυχώς!');
    res.redirect(`/products/${id}`);
};