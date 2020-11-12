const mongoose = require('mongoose');
const Shop = require('./shop')
const Price = require('./price');
const Review = require('./review');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    title: String,
    price: [String],
    category: [String],
    shopSelected: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    countedWithQuantity: Boolean,
    quantity: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    foundIn: [String],
    price2: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Price'
        }
    ],
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

// Όταν διαγραφεί ένα προϊόν, θα διαγραφούν και όλες οι αξιλογήσεις του
ProductSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Product', ProductSchema);