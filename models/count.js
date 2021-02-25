const mongoose = require('mongoose');
const Shop = require('./shop')
const Price = require('./price');
const Review = require('./review');
const User = require('./user');
const Schema = mongoose.Schema;


const CountSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product:
    {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
    ,
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model('Count', CountSchema);