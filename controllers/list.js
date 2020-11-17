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


    for (let product of list.products) {
        for (let price of product.price2) {

            if (product.countedWithQuantity) {


                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * product.quantity;
                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * product.quantity;
                }

            } else {

                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * product.weight;
                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * product.weight;
                }
            }
        }
    }

    const shops = await Shop.find()

    // Pinakas pou tha vazw ola ta koina katastimata twn proiontwn tis listas
    let commonShops = []

    res.render('list', { list, masoutisTotal, myMarketTotal, shops });
};

module.exports.updateList = async (req, res, next) => {
    const x = 5;
}