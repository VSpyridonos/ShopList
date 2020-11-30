const Product = require('../models/product');
const Price = require('../models/price');
const Shop = require('../models/shop');
const User = require('../models/user');
const List = require('../models/list')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;

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
    const vasilopoulos = await Shop.findOne({ title: 'ΑΒ Βασιλόπουλος' });

    let masoutisTotal = 0;
    let myMarketTotal = 0;
    let vasilopoulosTotal = 0;

    //console.log('%j', list)

    let masoutisCounter = 0;
    let myMarketCounter = 0;
    let vasilopoulosCounter = 0;

    let masoutisHasAllProducts = true;
    let myMarketHasAllProducts = true;
    let vasilopoulosHasAllProducts = true;

    for (let product of list.products) {
        for (let price of product.price2) {

            if (product.countedWithQuantity) {


                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * product.quantity;
                    masoutisCounter++;

                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * product.quantity;
                    myMarketCounter++;

                } else if (String(price.shop) == String(vasilopoulos._id)) {

                    vasilopoulosTotal += price.price * product.quantity;
                    vasilopoulosCounter++;
                }

            } else {

                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * product.weight;
                    masoutisCounter++;

                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * product.weight;
                    myMarketCounter++;

                } else if (String(price.shop) == String(vasilopoulos._id)) {

                    vasilopoulosTotal += price.price * product.weight;
                    vasilopoulosCounter++;
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

    if (vasilopoulosCounter === list.products.length) {
        vasilopoulosHasAllProducts = true;
    } else {
        vasilopoulosHasAllProducts = false;
    }

    const shops = await Shop.find()

    // Pinakas pou tha vazw ola ta koina katastimata twn proiontwn tis listas
    let currentUserAddress = req.user.address;

    res.render('list', { list, masoutisTotal, myMarketTotal, vasilopoulosTotal, masoutisHasAllProducts, myMarketHasAllProducts, vasilopoulosHasAllProducts, shops, googleMapsKey, currentUserAddress });
};

module.exports.updateList = async (req, res, next) => {
    const x = 5;
}

module.exports.openUrl = (req, res) => {
    res.redirect(url);
}

module.exports.increaseQuantity = async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { quantity: 1 } });

    res.redirect('/list');
}

module.exports.increaseWeightByALittle = async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { weight: 0.1 } });

    res.redirect('/list');
}

module.exports.increaseWeightByALot = async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { weight: 1.0 } });

    res.redirect('/list');
}

module.exports.decreaseQuantity = async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (product.quantity >= 2) {
        product.quantity--;
        await product.save();
    }
    // const product = await Product.findByIdAndUpdate(id, { $inc: { quantity: -1 } });

    res.redirect('/list');
}

module.exports.decreaseWeightByALittle = async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (product.weight >= 0.2) {
        product.weight -= 0.1;
        await product.save();
    }

    res.redirect('/list');
}

module.exports.decreaseWeightByALot = async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (product.weight >= 1.0) {
        product.weight -= 1.0;
        await product.save();
    }

    res.redirect('/list');
}

module.exports.removeProduct = async (req, res, next) => {
    //const product = await Product.findById(req.params.id);
    const { id } = req.params;
    const list = await List.findOne({ owner: req.user._id });
    list.products.pull({ _id: id });

    await list.save();
    console.log(list);


    res.redirect('/list');
}