const User = require('../models/user');
const List = require('../models/list');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            } else {
                console.log(req.user._id)
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