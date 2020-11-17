const mongoose = require('mongoose');
const Product = require('./product');
const Price = require('./price');
const Schema = mongoose.Schema;


const ShopSchema = new Schema({
    title: String,
    organization: String,
    address: String,
    latitude: Number,
    longitude: Number,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});

module.exports = mongoose.model('Shop', ShopSchema);