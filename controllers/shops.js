const Product = require('../models/product');
const Price = require('../models/price');
const Shop = require('../models/shop');
const List = require('../models/list');
const User = require('../models/user');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


module.exports.showMap = async (req, res, next) => {
    const shops = await Shop.find()
    res.render('shops/map', { shops });
};

module.exports.createShop = async (req, res, next) => {
    const geoData = await geocoder.reverseGeocode({
        query: [20.843095, 39.644506],
        limit: 1
    }).send()
    const shop = await Shop.find({ name: 'Μασούτης' })
    shop.geometry = geoData.body.features[0].geometry;
    console.log(shop);
    res.redirect('/shops');

}
