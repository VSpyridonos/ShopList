const Product = require('../models/product');
const Price = require('../models/price');
const Shop = require('../models/shop');
const User = require('../models/user');
const List = require('../models/list');
const Count = require('../models/count');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;
const fetch = require('node-fetch');
const product = require('../models/product');

module.exports.showList = async (req, res, next) => {
    const list = await List.findOne({ owner: req.user._id }).populate({
        path: 'products',
        populate: {
            path: 'product'
        }
    }).populate('Shop')
        .populate({
            path: 'products',
            populate: {
                path: 'price',
                model: 'Price'
            }
        }).populate('Price').populate({
            path: 'price',
            populate: {
                path: 'shop'
            }
        });

    const masoutis = await Shop.findOne({ title: 'Μασούτης' });
    const myMarket = await Shop.findOne({ title: 'My market' });
    const vasilopoulos = await Shop.findOne({ title: 'ΑΒ Βασιλόπουλος' });
    const sklavenitis = await Shop.findOne({ title: 'Σκλαβενίτης' });

    let masoutisTotal = 0;
    let myMarketTotal = 0;
    let vasilopoulosTotal = 0;
    let sklavenitisTotal = 0;

    let masoutisCounter = 0;
    let myMarketCounter = 0;
    let vasilopoulosCounter = 0;
    let sklavenitisCounter = 0;

    let masoutisHasAllProducts = true;
    let myMarketHasAllProducts = true;
    let vasilopoulosHasAllProducts = true;
    let sklavenitisHasAllProducts = true;

    let productCounter = 0;
    const allCounts = await Count.find({ owner: req.user._id });


    for (let product of list.products) {
        const foundCount = await Count.findOne({ owner: req.user._id, product: product.id });
        //console.log(foundCount)
        for (let price of product.price) {
            if (product.countedWithQuantity) {

                product.quantity = foundCount.count;

                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * foundCount.count;
                    masoutisCounter++;

                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * foundCount.count;
                    myMarketCounter++;

                } else if (String(price.shop) == String(vasilopoulos._id)) {

                    vasilopoulosTotal += price.price * foundCount.count;
                    vasilopoulosCounter++;

                } else if (String(price.shop) == String(sklavenitis._id)) {

                    sklavenitisTotal += price.price * foundCount.count;
                    sklavenitisCounter++;
                }

            } else {

                product.weight = foundCount.count;


                if (String(price.shop) == String(masoutis._id)) {

                    masoutisTotal += price.price * foundCount.count;
                    masoutisCounter++;

                } else if (String(price.shop) == String(myMarket._id)) {

                    myMarketTotal += price.price * foundCount.count;
                    myMarketCounter++;

                } else if (String(price.shop) == String(vasilopoulos._id)) {

                    vasilopoulosTotal += price.price * foundCount.count;
                    vasilopoulosCounter++;

                } else if (String(price.shop) == String(sklavenitis._id)) {

                    sklavenitisTotal += price.price * foundCount.count;
                    sklavenitisCounter++;
                }
            }

        }
        product.save();
        productCounter++;
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

    if (sklavenitisCounter === list.products.length) {
        sklavenitisHasAllProducts = true;
    } else {
        sklavenitisHasAllProducts = false;
    }

    const shops = await Shop.find()

    // Pinakas pou tha vazw ola ta koina katastimata twn proiontwn tis listas
    let currentUserAddress = req.user.address;

    async function getWeather() {
        const weather = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=ioannina&units=metric&lang=el&APPID=28c45ebeb80a0d5b9da4b07bced3e23a"
        );
        let response = await weather.json();
        return response;
    }

    const currentWeather = await getWeather();

    res.render('list', { list, currentWeather, masoutisTotal, myMarketTotal, vasilopoulosTotal, sklavenitisTotal, masoutisHasAllProducts, myMarketHasAllProducts, vasilopoulosHasAllProducts, sklavenitisHasAllProducts, shops, googleMapsKey, currentUserAddress });
};

module.exports.updateList = async (req, res, next) => {
    const x = 5;
}

module.exports.openUrl = (req, res) => {
    res.redirect(url);
}

module.exports.increaseQuantity = async (req, res, next) => {
    //const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { quantity: 1 } });
    const product = await Product.findById(req.params.id);
    const count = await Count.findOne({ owner: req.user._id, product: product.id });
    count.count += 1;
    await count.save();

    res.redirect('/list');
}

module.exports.increaseWeightByALittle = async (req, res, next) => {
    // const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { weight: 0.1 } });
    const product = await Product.findById(req.params.id);
    const count = await Count.findOne({ owner: req.user._id, product: product.id });
    count.count += 0.1;
    await count.save();

    res.redirect('/list');
}

module.exports.increaseWeightByALot = async (req, res, next) => {
    // const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { weight: 1.0 } });
    const product = await Product.findById(req.params.id);
    const count = await Count.findOne({ owner: req.user._id, product: product.id });
    count.count += 1.0;
    await count.save();

    res.redirect('/list');
}

module.exports.decreaseQuantity = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const count = await Count.findOne({ owner: req.user._id, product: product.id });
    // if (product.quantity >= 2) {
    //     product.quantity--;
    //     await product.save();
    // }
    if (count.count >= 2) {
        count.count--;
        await count.save();
    }
    // const product = await Product.findByIdAndUpdate(id, { $inc: { quantity: -1 } });

    res.redirect('/list');
}

module.exports.decreaseWeightByALittle = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const count = await Count.findOne({ owner: req.user._id, product: product.id });
    // if (product.quantity >= 2) {
    //     product.quantity--;
    //     await product.save();
    // }
    if (count.count >= 0.2) {
        count.count -= 0.1;
        await count.save();
    }
    // if (product.weight >= 0.2) {
    //     product.weight -= 0.1;
    //     await product.save();
    // }

    res.redirect('/list');
}

module.exports.decreaseWeightByALot = async (req, res, next) => {
    // const product = await Product.findById(req.params.id)
    // if (product.weight >= 1.0) {
    //     product.weight -= 1.0;
    //     await product.save();
    // }
    const product = await Product.findById(req.params.id);
    const count = await Count.findOne({ owner: req.user._id, product: product.id });

    if (count.count >= 1.0) {
        count.count -= 1.0;
        await count.save();
    }

    res.redirect('/list');
}

module.exports.removeProduct = async (req, res, next) => {
    //const product = await Product.findById(req.params.id);
    const product = await Product.findById(req.params.id);

    const count = await Count.findOne({ owner: req.user._id, product: product.id });
    count.count = 0;
    await count.save();

    const list = await List.findOne({ owner: req.user._id });
    list.products.pull({ _id: product.id });



    await list.save();
    console.log(list);

    res.redirect('/list');
}