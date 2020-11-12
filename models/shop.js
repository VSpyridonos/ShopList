const mongoose = require('mongoose');
const Product = require('./product');
const Price = require('./price');
const Schema = mongoose.Schema;


const ShopSchema = new Schema({
    title: String,
    organization: String,
    address: String,
    latitude: Number,
    longitude: Number

});

module.exports = mongoose.model('Shop', ShopSchema);