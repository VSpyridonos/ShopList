const sanitizeHtml = require('sanitize-html');
const Product = require('../models/product');
const Price = require('../models/price');
const Shop = require('../models/shop');
const List = require('../models/list');
const User = require('../models/user');
const Count = require('../models/count');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;



module.exports.index = async (req, res, next) => {
    let noMatch = null;
    if (req.query.search) {
        const cleanQuery = sanitizeHtml(req.query.search);
        const regex = new RegExp(escapeRegex(cleanQuery), 'gi');
        const products = await Product.find({ title: regex }, function (err, products) {
            if (err) {
                console.log(err);
            } else {
                if (products.length < 1) {
                    req.flash('error', 'Δε βρέθηκαν προϊόντα για αυτήν την αναζήτηση!');
                    res.redirect('back');

                } else res.render('products/index', { products });


            }

        }).populate({
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
    } else {
        const products = await Product.find({}).populate({
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
        res.render('products/index', { products });
    }
};

module.exports.renderNewForm = (req, res) => {
    res.render('products/new');
};

module.exports.createProduct = async (req, res, next) => {

    // if (!req.body.product) throw new ExpressError('Invalid Product Data', 400);
    const product = new Product(req.body.product);
    await product.save();
    req.flash('success', 'Το προϊόν δημιουργήθηκε επιτυχώς!');
    res.redirect(`/products/${product._id}`)
};

let currentProduct = ''
module.exports.showProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author').populate({
        path: 'price',
        populate: {
            path: 'shop'
        }
    }).populate('shopSelected');
    currentProduct = product;

    //console.log('%j', product)
    if (!product) {
        req.flash('error', 'Δε βρέθηκε το συγκεκριμένο προϊόν!')
        return res.redirect('/products');
    }
    const shopsPrizes = []

    for (let bruh of product.price) {
        const zz = await Price.findById(bruh)
        const xz = await Shop.findById(zz.shop._id)
        shopsPrizes.push(`${xz.title}: ${zz.price}`)

    }
    tempPath = "";
    tempPath += product.image;
    res.render('products/show', { product, tempPath, shopsPrizes });
};

module.exports.renderEditForm = async (req, res) => {
    const product = await Product.findById(req.params.id);

};

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    req.flash('success', 'Το προϊόν ενημερώθηκε επιτυχώς!');
};

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Το προϊόν διαγράφηκε επιτυχώς!');
    res.redirect('/products');
}



module.exports.addProductToList = async (req, res) => {


    const list = await List.findOne({ owner: req.user._id });
    let foundCount = await Count.findOne({ owner: req.user._id, product: currentProduct.id });
    //console.log(foundCount)
    //console.log('this is my list: ', list);
    // An metrietai me posotita
    if (currentProduct.countedWithQuantity) {

        // An yparxei idi to proion sti lista auksanw posotita
        if (list.products.includes(currentProduct._id)) {
            //await Product.findByIdAndUpdate(currentProduct._id, { quantity: parseInt(req.body.quantity) + parseInt(currentProduct.quantity) });
            //await Product.findByIdAndUpdate(currentProduct._id, { count: parseInt(req.body.quantity) + parseInt(currentProduct.count) })
            //let foundProduct = await Product.findById(currentProduct._id)
            // currentUser.populate({
            //     path: 'count',
            //     populate: {
            //         path: 'product'
            //     }
            // });

            foundCount.count += parseInt(req.body.quantity);
            foundCount.save();
            // foundProduct.count.count = parseInt(req.body.quantity) + parseInt(foundProduct.count.count)
            // foundProduct.save();

            // Alliws to eisagw sti lista
        } else {
            //await Product.findByIdAndUpdate(currentProduct._id, { quantity: req.body.quantity });
            //await Product.findByIdAndUpdate(currentProduct._id, { count: parseInt(req.body.quantity) })
            // let foundProduct = await Product.findById(currentProduct._id)
            // let foundCount = await Count.findOne(currentProduct._id)
            // foundProduct.count.count = parseInt(req.body.quantity);
            // foundProduct.save();
            //await list.products.unshift(currentProduct);
            foundCount.count += parseInt(req.body.quantity);
            foundCount.save();
            await list.products.unshift(currentProduct);
        }

        // An metrietai me kila, paromoia diadikasia me apo panw
    } else {
        //await Product.findByIdAndUpdate(currentProduct._id, { weight: req.body.weight })
        // An yparxei idi to proion sti lista auksanw kila
        if (list.products.includes(currentProduct._id)) {
            //await Product.findByIdAndUpdate(currentProduct._id, { weight: (parseFloat(req.body.weight) + parseFloat(currentProduct.weight)).toFixed(2) })
            //await Product.findByIdAndUpdate(currentProduct._id, { count: (parseFloat(req.body.weight) + parseInt(currentProduct.count)).toFixed(2) })
            // let foundProduct = await Product.findById(currentProduct._id)
            // foundProduct.count.count = (parseFloat(req.body.weight) + parseInt(foundProduct.count.count)).toFixed(2);
            // foundProduct.save();
            foundCount.count += parseFloat(req.body.weight);
            foundCount.count.toFixed(2);
            foundCount.save();

            // Alliws to eisagw sti lista
        } else {
            //await Product.findByIdAndUpdate(currentProduct._id, { weight: req.body.weight });
            //await Product.findByIdAndUpdate(currentProduct._id, { count: req.body.weight });
            // let foundProduct = await Product.findById(currentProduct._id)
            // foundProduct.count.count = parseFloat(req.body.weight);
            // foundProduct.save();

            foundCount.count += parseFloat(req.body.weight);
            foundCount.count.toFixed(2);
            foundCount.save();
            //await list.products.unshift(currentProduct);
            await list.products.unshift(currentProduct);
        }
    }

    /*
    console.log("AUTO EINAI TO PROION POU VAZW STI LISTA ", currentProduct._id)
    console.log('AUTO EINAI ENA PROION TIS LISTAS', list.products)
    console.log('APOTELESMA', list.products.includes(currentProduct._id))
    console.log('AUTO EINAI TO SHOP', list.products)
    //await list.products.unshift(currentProduct);

    */


    await list.save();

    //console.log('AUTO EINAI TO', req.body.quantity);
    res.redirect(`/products`);
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};