const mongoose = require('mongoose');
const Shop = require('../models/shop');
const Product = require('../models/product');
const Category = require('../models/category');
const Price = require('../models/price');
const List = require('../models/list');
const User = require('../models/user');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: 'pk.eyJ1IjoidnNweXIiLCJhIjoiY2toa3VvbmR3MXBrZTJzcXFzdTRobjh2eiJ9.NEuCHT7ZvhtJbjhDiLCbYg' });

mongoose.connect('mongodb://localhost:27017/shopList', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected");
});


const seedDB = async () => {

}

seedDB();