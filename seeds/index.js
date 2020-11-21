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
    await Product.deleteMany({});
    await Shop.deleteMany({});
    await Category.deleteMany({});
    await Price.deleteMany({});
    await List.deleteMany({});
    await User.deleteMany({});

    const p1 = new Product({
        title: 'Νουνού Family Γάλα 3,6% 1lt.',
        price: ['Μασούτης: 1.56', 'My market: 1.02'],
        category: ['Γαλακτοκομικά & Είδη Ψυγείου', 'Γάλατα'],
        countedWithQuantity: true,
        foundIn: ['Μασούτης', 'My market'],
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1605545290/ShopList/%CE%9D%CE%BF%CF%85%CE%BD%CE%BF%CF%8D_Family_%CE%93%CE%AC%CE%BB%CE%B1_3_6_1lt._hx8mfv.jpg'

    })
    const p2 = new Product({
        title: 'Zagorin Μήλα Ζαγοράς Πηλίου ΠΟΠ Κόκκινα',
        price: ['Μασούτης: 1.99', 'My market: 2.05'],
        category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
        countedWithQuantity: false,
        foundIn: ['Μασούτης', 'My market'],
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1605545316/ShopList/Zagorin_%CE%9C%CE%AE%CE%BB%CE%B1_%CE%96%CE%B1%CE%B3%CE%BF%CF%81%CE%AC%CF%82_%CE%A0%CE%B7%CE%BB%CE%AF%CE%BF%CF%85_%CE%A0%CE%9F%CE%A0_%CE%9A%CF%8C%CE%BA%CE%BA%CE%B9%CE%BD%CE%B1_cfwa3z.png'
    })

    const p3 = new Product({
        title: 'Μπανάνες Dole Εισαγωγής Χύμα',
        category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
        countedWithQuantity: false,
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1605973471/ShopList/%CE%9C%CF%80%CE%B1%CE%BD%CE%AC%CE%BD%CE%B5%CF%82_Dole_%CE%95%CE%B9%CF%83%CE%B1%CE%B3%CF%89%CE%B3%CE%AE%CF%82_%CE%A7%CF%8D%CE%BC%CE%B1_nltuo9.jpg'
    })

    const c1 = new Category({
        title: 'Γαλακτοκομικά & Είδη Ψυγείου',
        subcategories: ['Γάλα', 'Τυρί', 'Αυγά']
    })
    const c2 = new Category({
        title: 'Φρούτα & Λαχανικά',
        subcategories: ['Φρούτα', 'Λαχανικά']
    })

    const geoData1 = await geocoder.reverseGeocode({
        query: [20.843095, 39.644506],
        limit: 1
    })
    const geoData2 = await geocoder.reverseGeocode({
        query: [20.859119, 39.658021],
        limit: 1
    })

    const s1 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Παναγιώτη Ασημακόπουλου 2, Κάτω Νεοχωρόπουλο 455 00",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.843286, 39.644403] }

    })
    const s2 = new Shop({
        title: "My market",
        organization: "My market",
        address: "Λεωφόρος Αρχιεπισκόπου Μακαρίου &, Ikkou 45, Ioannina 452 21",
        site: "eshop.mymarket.gr/",
        geometry: { type: 'Point', coordinates: [20.859119, 39.658021] }

    })

    const s3 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Λεωφ. Γεωρ. Παπανδρέου 26-28, Ιωάννινα 454 44",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.849560732880143, 39.67280342773821] }

    })

    const s4 = new Shop({
        title: "My market",
        organization: "My market",
        address: "Ιωαννίνων 4, Ανατολή 452 21",
        site: "eshop.mymarket.gr/",
        geometry: { type: 'Point', coordinates: [20.863529489470906, 39.641368251044] }

    })



    const list = new List({})

    await p1.save();
    await p2.save();
    await c1.save();
    await c2.save();
    await s1.save();
    await s2.save();
    await s3.save();
    await s4.save();
    await list.save();

    // Gala kai Mila
    const pr1 = new Price({
        price: 1.56,
        shop: s1._id,
        date: 2020 - 04 - 04
    })

    const pr2 = new Price({
        price: 1.02,
        shop: s2._id,
        date: 2020 - 04 - 03
    })

    const pr3 = new Price({
        price: 1.99,
        shop: s1._id,
        date: 2020 - 04 - 04
    })

    const pr4 = new Price({
        price: 2.05,
        shop: s2._id,
        date: 2020 - 04 - 04
    })

    const pr5 = new Price({
        price: 1.56,
        shop: s3._id,
        date: 2020 - 04 - 04
    })

    const pr6 = new Price({
        price: 1.99,
        shop: s3._id,
        date: 2020 - 04 - 03
    })

    const pr7 = new Price({
        price: 1.02,
        shop: s4._id,
        date: 2020 - 04 - 03
    })

    const pr8 = new Price({
        price: 2.05,
        shop: s4._id,
        date: 2020 - 04 - 04
    })

    // Mpananes
    const pr9 = new Price({
        price: 1.59,
        shop: s2._id,
        date: 2020 - 04 - 04
    })

    const pr10 = new Price({
        price: 1.59,
        shop: s4._id,
        date: 2020 - 04 - 04
    })

    await pr1.save();
    await pr2.save();
    await pr3.save();
    await pr4.save();
    await pr5.save();
    await pr6.save();
    await pr7.save();
    await pr8.save();
    await pr9.save();
    await pr10.save();

    p1.price2.push(pr1, pr2, pr5, pr7);
    p2.price2.push(pr3, pr4, pr6, pr8);
    p3.price2.push(pr9, pr10);
    await p1.save();
    await p2.save();
    await p3.save()
    console.log(p1, p2, p3)



    // const p3 = new Product({
    //     title: 'Πατάτες',
    //     price: ['Μασούτης: 1.99', 'My market: 2.05'],
    //     category: ['Φρούτα & Λαχανικά'],
    //     countedWithQuantity: false,
    //     foundIn: ['Μασούτης', 'My market'],
    //     image: '/home/user/Desktop/thesis/images/mila.png'
    // })

    // const pr1 = new Price({
    //     price: 5.99,
    //     shop: s1._id,
    //     date: 2020 - 03 - 04
    // })

    // const pr2 = new Price({
    //     price: 7.99,
    //     shop: s2._id,
    //     date: 2020 - 08 - 02
    // })

    // await p3.save();
    // await pr1.save();
    // await pr2.save();

    // p3.price2.push(pr1);
    // p3.price2.push(pr2);
    // const name = p3.title

    // for (let pr of p3.price2) {
    //     let xx = await Price.findById(pr);
    //     let zz = await Shop.findById(xx.shop)

    //     const sth = await console.log(`To proion ${name} vrisketai sto ${zz.title} kai kostizei ${pr.price}`)
    // }

}

seedDB();