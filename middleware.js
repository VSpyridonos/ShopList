const ExpressError = require('./utilities/ExpressError');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Πρέπει πρώτα να συνδεθείτε!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Δεν έχετε άδεια να πραγματοποιήσετε αυτή την ενέργεια!');
        return res.redirect(`/products/${id}`);
    }
    next();
}
