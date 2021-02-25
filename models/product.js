const mongoose = require('mongoose');
const Shop = require('./shop')
const Price = require('./price');
const Review = require('./review');
const Count = require('./count');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    title: String,
    category: [String],
    countedWithQuantity: Boolean,
    quantity: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    price: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Price'
        }
    ],
    image: String,
    imageFrom: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
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