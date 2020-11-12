const mongoose = require('mongoose');
const Shop = require('./shop');
const Product = require('./product');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    price: Number,
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    date: Date

});

module.exports = mongoose.model('Price', PriceSchema);