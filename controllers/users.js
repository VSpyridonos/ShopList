const sanitizeHtml = require('sanitize-html');
const User = require('../models/user');
const List = require('../models/list');
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const address = sanitizeHtml(req.body.address) + ', Ιωάννινα';
        const user = new User({ email, username, address });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            } else {
                const list = new List();
                list.owner = req.user._id;
                list.save();
                req.flash('success', 'Καλωσήρθατε στο ShopList!');
                res.redirect('/products');
            }
        })


    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }

};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Καλωσήρθατε Ξανά!');

    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Αντίο!");
    res.redirect('/');
};

module.exports.showAccount = (req, res) => {
    let currentUser = req.user;
    res.render('users/account', { currentUser });
}

module.exports.changeAddress = async (req, res, next) => {
    let newAddress = sanitizeHtml(req.body.address) + ', Ιωάννινα';
    const theUser = await User.findByIdAndUpdate(req.user._id, { address: newAddress });
    await theUser.save();
    req.flash('success', "Η Διεύθυνσή σας άλλαξε με επιτυχία!");
    res.redirect('/account')
}