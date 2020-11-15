const mongoose = require('mongoose');
const Shop = require('../models/shop');
const Product = require('../models/product');
const Category = require('../models/category');
const Price = require('../models/price');
const List = require('../models/list');
const User = require('../models/user');

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
        image: '/home/user/Desktop/thesis/images/nounou.jpg'

    })
    const p2 = new Product({
        title: 'Zagorin Μήλα Ζαγοράς Πηλίου ΠΟΠ Κόκκινα',
        price: ['Μασούτης: 1.99', 'My market: 2.05'],
        category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
        countedWithQuantity: false,
        foundIn: ['Μασούτης', 'My market'],
        image: '/home/user/Desktop/thesis/images/mila.png'
    })
    const c1 = new Category({
        title: 'Γαλακτοκομικά & Είδη Ψυγείου',
        subcategories: ['Γάλα', 'Τυρί', 'Αυγά']
    })
    const c2 = new Category({
        title: 'Φρούτα & Λαχανικά',
        subcategories: ['Φρούτα', 'Λαχανικά']
    })
    const s1 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Ράντομ οδός 23",
        latitude: 124,
        longitude: 125

    })
    const s2 = new Shop({
        title: "My market",
        organization: "My market",
        address: "Ράντομ οδός 29",
        latitude: 129,
        longitude: 145

    })

    const list = new List({})

    await p1.save();
    await p2.save();
    await c1.save();
    await c2.save();
    await s1.save();
    await s2.save();
    await list.save();

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

    await pr1.save();
    await pr2.save();
    await pr3.save();
    await pr4.save();

    p1.price2.push(pr1, pr2);
    p2.price2.push(pr3, pr4);
    await p1.save();
    await p2.save();
    console.log(p1, p2)



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