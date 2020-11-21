const Product = require('../models/product');
const Price = require('../models/price');
const Shop = require('../models/shop');
const User = require('../models/user');
const List = require('../models/list')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.showList = async (req, res, next) => {
    const list = await List.findOne({ owner: req.user._id }).populate({
        path: 'products',
        populate: {
            path: 'product'
        }
    }).populate({
        path: 'products',
        populate: {
            path: 'shopSelected',
            model: 'Shop'
        }
    }).populate('Shop')
        .populate({
            path: 'products',
            populate: {
                path: 'price2',
                model: 'Price'
            }
        }).populate('Price').populate({
            path: 'price2',
            populate: {
                path: 'shop'
            }
        });

    const masoutis = await Shop.findOne({ title: 'Μασούτης' });
    const myMarket = await Shop.findOne({ title: 'My market' });

    let masoutisTotal = 0;
    let myMarketTotal = 0;

    //console.log('%j', list)

    let masoutisCounter = 0;
    let myMarketCounter = 0;

    let masoutisHasAllProducts = true;
    let myMarketHasAllProducts = true;

    for (let product of list.products) {
        for (let price of product.price2) {

            if (product.countedWithQuantity) {


                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * product.quantity;
                    masoutisCounter++;
                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * product.quantity;
                    myMarketCounter++;
                }

            } else {

                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * product.weight;
                    masoutisCounter++;
                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * product.weight;
                    myMarketCounter++;
                }
            }
        }
    }

    if (masoutisCounter === list.products.length) {
        masoutisHasAllProducts = true;
    } else {
        masoutisHasAllProducts = false;
    }

    if (myMarketCounter === list.products.length) {
        myMarketHasAllProducts = true;
    } else {
        myMarketHasAllProducts = false;
    }

    const shops = await Shop.find()

    // Pinakas pou tha vazw ola ta koina katastimata twn proiontwn tis listas
    let commonShops = []

    res.render('list', { list, masoutisTotal, myMarketTotal, masoutisHasAllProducts, myMarketHasAllProducts, shops });
};

module.exports.updateList = async (req, res, next) => {
    const x = 5;
}

module.exports.openUrl = (req, res) => {
    res.redirect(url);
}

module.exports.reduceQuantity = async (req, res, next) => {

}