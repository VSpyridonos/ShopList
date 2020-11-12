const mongoose = require('mongoose');
const Shop = require('./shop')
const Price = require('./price');
const Review = require('./review');
const User = require('./user');
const Schema = mongoose.Schema;


const ListSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    selectedPrice: {
        type: Schema.Types.ObjectId,
        ref: 'Price'
    },
    totalPrice: Number

});

module.exports = mongoose.model('List', ListSchema);