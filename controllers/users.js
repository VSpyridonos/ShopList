const User = require('../models/user');
const List = require('../models/list');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: 'pk.eyJ1IjoidnNweXIiLCJhIjoiY2toa3VvbmR3MXBrZTJzcXFzdTRobjh2eiJ9.NEuCHT7ZvhtJbjhDiLCbYg' });

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password, address } = req.body;
        const geoData = await geocoder.forwardGeocode({
            query: address,
            limit: 1
        }).send()
        theAddress = geoData.body.features[0].geometry;
        const user = new User({ email, username, address: theAddress });
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