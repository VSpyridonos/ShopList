const mongoose = require('mongoose');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const Shop = require('../models/shop');
const Product = require('../models/product');
const Category = require('../models/category');
const Price = require('../models/price');
const List = require('../models/list');
const User = require('../models/user');
const Count = require('../models/count');

require('dotenv').config();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/shopList';
//const dbUrl = 'mongodb://localhost:27017/shopList';

mongoose.connect(dbUrl, {
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
    await Count.deleteMany({});

    const p1 = new Product({
        title: 'Νουνού Family Γάλα 3,6% 1lt.',
        category: ['Γαλακτοκομικά & Είδη Ψυγείου', 'Γάλατα'],
        countedWithQuantity: true,
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1605545290/ShopList/%CE%9D%CE%BF%CF%85%CE%BD%CE%BF%CF%8D_Family_%CE%93%CE%AC%CE%BB%CE%B1_3_6_1lt._hx8mfv.jpg',
        imageFrom: 'Μασούτης'

    })
    const p2 = new Product({
        title: 'Zagorin Μήλα Ζαγοράς Πηλίου ΠΟΠ Κόκκινα',
        category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
        countedWithQuantity: false,
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1605545316/ShopList/Zagorin_%CE%9C%CE%AE%CE%BB%CE%B1_%CE%96%CE%B1%CE%B3%CE%BF%CF%81%CE%AC%CF%82_%CE%A0%CE%B7%CE%BB%CE%AF%CE%BF%CF%85_%CE%A0%CE%9F%CE%A0_%CE%9A%CF%8C%CE%BA%CE%BA%CE%B9%CE%BD%CE%B1_cfwa3z.png',
        imageFrom: 'Μασούτης'
    })

    const p3 = new Product({
        title: 'Μπανάνες Dole Εισαγωγής Χύμα',
        category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
        countedWithQuantity: false,
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1605973471/ShopList/%CE%9C%CF%80%CE%B1%CE%BD%CE%AC%CE%BD%CE%B5%CF%82_Dole_%CE%95%CE%B9%CF%83%CE%B1%CE%B3%CF%89%CE%B3%CE%AE%CF%82_%CE%A7%CF%8D%CE%BC%CE%B1_nltuo9.jpg',
        imageFrom: 'Μασούτης'
    })


    // MASOUTIS
    const s1 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Παναγιώτη Ασημακόπουλου 2, Κάτω Νεοχωρόπουλο 455 00",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.843286, 39.644403] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })


    const s3 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Λεωφ. Γεωρ. Παπανδρέου 26-28, Ιωάννινα 454 44",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.849560732880143, 39.67280342773821] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })

    const s5 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Νικοπόλεως 95 - 97, Ιωάννινα 452 21",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.864957043995826, 39.64518525630644] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })

    const s6 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Νικοπόλεως 95 - 97, Ιωάννινα 452 21",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.864957043995826, 39.64518525630644] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })

    const s7 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Νικοπόλεως 95 - 97, Ιωάννινα 452 21",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.864957043995826, 39.64518525630644] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })

    const s8 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Μ. Αλεξανδρου & Κ. Παλαιολογου Ανατολη, Ioannina 452 22",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.860322180648616, 39.63434293334608] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })

    const s9 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Μαρίκας Κοτοπούλη 66 – 68, Ιωάννινα 454 45",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.838053676777147, 39.67932595765891] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })

    const s10 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Ρήγα Φεραίου 2, Ιωάννινα 455 00",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.823400238154644, 39.682826414786476] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })

    const s11 = new Shop({
        title: "Μασούτης",
        organization: "Μασούτης",
        address: "Ε.Ο. Άρτας Ιωαννίνων 68, Ιωάννινα 452 21",
        site: "eshop.masoutis.gr/",
        geometry: { type: 'Point', coordinates: [20.858090576586346, 39.63070466029011] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606328667/ShopList/masoutis_x825ww.png'

    })



    // MY MARKET
    const s2 = new Shop({
        title: "My market",
        organization: "My market",
        address: "Λεωφόρος Αρχιεπισκόπου Μακαρίου &, Ikkou 45, Ioannina 452 21",
        site: "eshop.mymarket.gr/",
        geometry: { type: 'Point', coordinates: [20.859119, 39.658021] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606330840/ShopList/myMarket_zgz0e0.jpg'

    })

    const s4 = new Shop({
        title: "My market",
        organization: "My market",
        address: "Ιωαννίνων 4, Ανατολή 452 21",
        site: "eshop.mymarket.gr/",
        geometry: { type: 'Point', coordinates: [20.863529489470906, 39.641368251044] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606330840/ShopList/myMarket_zgz0e0.jpg'

    })

    const s12 = new Shop({
        title: "My market",
        organization: "My market",
        address: "2ο χλμ. Ιωαννίνων-Άρτας, Ioannina 454 45",
        site: "eshop.mymarket.gr/",
        geometry: { type: 'Point', coordinates: [20.850537469821724, 39.644780825602254] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606330840/ShopList/myMarket_zgz0e0.jpg'

    })

    const s13 = new Shop({
        title: "My market",
        organization: "My market",
        address: "Εθνική Οδός Ηγουμενίτσας - Ιωαννίνων - Νέα Ζωή, Ιωάννινα, Νέα Ζωή 455 00",
        site: "eshop.mymarket.gr/",
        geometry: { type: 'Point', coordinates: [20.820136838154642, 39.68520296477326] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606330840/ShopList/myMarket_zgz0e0.jpg'

    })

    // ΑΒ Βασιλόπουλος
    const s14 = new Shop({
        title: "ΑΒ Βασιλόπουλος",
        organization: "ΑΒ Βασιλόπουλος",
        address: "Αγίας Μαρίνας 24, Ιωάννινα 452 21",
        site: "https://www.ab.gr/",
        geometry: { type: 'Point', coordinates: [20.854867550847167, 39.66358922960993] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606766504/ShopList/ABvasilopoulos_sdgzac.jpg'

    })

    const s15 = new Shop({
        title: "ΑΒ Βασιλόπουλος",
        organization: "ΑΒ Βασιλόπουλος",
        address: "Αρχιεπισκόπου Μακαρίου, Λεωφ. Γεωρ. Γεννηματά, Ιωάννινα 452 21",
        site: "https://www.ab.gr/",
        geometry: { type: 'Point', coordinates: [20.85907325379558, 39.66193478762813] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606766504/ShopList/ABvasilopoulos_sdgzac.jpg'

    })

    const s16 = new Shop({
        title: "ΑΒ Βασιλόπουλος",
        organization: "ΑΒ Βασιλόπουλος",
        address: "Λεωφ. Γράμμου 28, Ιωάννινα 454 45",
        site: "https://www.ab.gr/",
        geometry: { type: 'Point', coordinates: [20.83467362965838, 39.684909155780616] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606766504/ShopList/ABvasilopoulos_sdgzac.jpg'

    })

    const s17 = new Shop({
        title: "ΑΒ Βασιλόπουλος",
        organization: "ΑΒ Βασιλόπουλος",
        address: "Ιατροπούλου 5, Πλατεία Μετσόβου, Metsovo 442 00",
        site: "https://www.ab.gr/",
        geometry: { type: 'Point', coordinates: [21.186020130264872, 39.78322212408017] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606766504/ShopList/ABvasilopoulos_sdgzac.jpg'

    })

    const s18 = new Shop({
        title: "ΑΒ Βασιλόπουλος",
        organization: "ΑΒ Βασιλόπουλος",
        address: "Αγίας Μαρίνας 24, Ιωάννινα 452 21",
        site: "https://www.ab.gr/",
        geometry: { type: 'Point', coordinates: [20.854867550847167, 39.66358922960993] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1606766504/ShopList/ABvasilopoulos_sdgzac.jpg'

    })

    // Σκλαβενίτης
    const s19 = new Shop({
        title: "Σκλαβενίτης",
        organization: "Σκλαβενίτης",
        address: "Λεωφ. Γράμμου, Λεωφ. Δημοκρατίας και, Ιωάννινα 454 45",
        site: "https://www.sklavenitis.gr/",
        geometry: { type: 'Point', coordinates: [20.831048825234813, 39.68669487151341] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1607885552/ShopList/sklavenitis_o14bux.png'

    })

    const s20 = new Shop({
        title: "Σκλαβενίτης",
        organization: "Σκλαβενίτης",
        address: "Ε.Ο. Ιωαννίνων - Δωδώνης, 455 00",
        site: "https://www.sklavenitis.gr/",
        geometry: { type: 'Point', coordinates: [20.850771352392186, 39.634789518311905] },
        image: 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1607885552/ShopList/sklavenitis_o14bux.png'

    })


    const list = new List({})

    await p1.save();
    await p2.save();
    await s1.save();
    await s2.save();
    await s3.save();
    await s4.save();
    await s5.save();
    await s6.save();
    await s7.save();
    await s8.save();
    await s9.save();
    await s10.save();
    await s11.save();
    await s12.save();
    await s13.save();
    await s14.save();
    await s15.save();
    await s16.save();
    await s17.save();
    await s18.save();
    await s19.save();
    await s20.save();
    await list.save();

    // Γάλα
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

    const pr5 = new Price({
        price: 1.58,
        shop: s14._id,
        date: 2020 - 11 - 30
    })

    const pr11 = new Price({
        price: 1.15,
        shop: s19._id,
        date: 2020 - 12 - 13
    })

    // Μήλα
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

    const pr6 = new Price({
        price: 2.01,
        shop: s14._id,
        date: 2020 - 11 - 30
    })

    const pr12 = new Price({
        price: 2.00,
        shop: s19._id,
        date: 2020 - 12 - 13
    })


    // const pr5 = new Price({
    //     price: 1.56,
    //     shop: s3._id,
    //     date: 2020 - 04 - 04
    // })

    // const pr6 = new Price({
    //     price: 1.99,
    //     shop: s3._id,
    //     date: 2020 - 04 - 03
    // })

    // const pr7 = new Price({
    //     price: 1.02,
    //     shop: s4._id,
    //     date: 2020 - 04 - 03
    // })

    // const pr8 = new Price({
    //     price: 2.05,
    //     shop: s4._id,
    //     date: 2020 - 04 - 04
    // })

    // Mpananes
    const pr9 = new Price({
        price: 1.59,
        shop: s2._id,
        date: 2020 - 04 - 04
    })

    const pr10 = new Price({
        price: 1.60,
        shop: s14._id,
        date: 2020 - 11 - 30
    })

    const pr13 = new Price({
        price: 1.58,
        shop: s19._id,
        date: 2020 - 12 - 13
    })

    // const pr10 = new Price({
    //     price: 1.59,
    //     shop: s4._id,
    //     date: 2020 - 04 - 04
    // })

    await pr1.save();
    await pr2.save();
    await pr3.save();
    await pr4.save();
    await pr5.save();
    await pr6.save();
    // await pr7.save();
    // await pr8.save();
    await pr9.save();
    await pr10.save();
    await pr11.save();
    await pr12.save();
    await pr13.save();


    let arrP1 = [pr1, pr2, pr5, pr11];
    let arrP2 = [pr3, pr4, pr6, pr12];
    let arrP3 = [pr9, pr10, pr13];

    // for (let i = 0; i < arrP1.length; i++) {
    //     console.log(arrP1[i].price);
    // }

    // Vazw ta price se seira analoga me to kostos wste na emfanizontai se auksousa seira sto products/show. Meta ta vazw sto price tou kathe product
    const sortAndPush = async function (arr, product) {
        let swapped;

        do {
            swapped = false;
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i].price > arr[i + 1].price) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);

        // Twra vazoume ta Price objects sto price tou kathe product
        for (let pr of arr) product.price.push(pr);

        // Apothikeusi antikeimenou Product
        await product.save()

    }

    sortAndPush(arrP1, p1);
    sortAndPush(arrP2, p2);
    sortAndPush(arrP3, p3);



    // Web Crawling
    const options = {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "key": "c38f43c316c2403b2e4cdf1461ff074c7cef544d0c88c5fb6def12f575980df7",
            "pragma": "no-cache",
            "uid": "f0c71c70-ef92-44a0-9cdf-91096986180a",
            "usl": "2021-01-31 19:25",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Mobile Safari/537.36"
        },
        "body": "{\"PassKey\":\"Sc@NnSh0p\",\"Itemcode\":\"566,011620\",\"ItemDescr\":\"0\",\"IfWeight\":1}",
        "method": "POST",
        "mode": "cors"
    };


    async function crawlHttp() {
        //const response = await fetch("https://eshop.masoutis.gr/WcfScanNShopForWeb/OrdersService.svc/GetPromoItemWithListCouponsSubCategories/", options);
        const response = await fetch("https://eshop.masoutis.gr/WcfScanNShopForWeb/OrdersService.svc/GetPromoItemWithListCouponsSubCategories/", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "el-GR,el;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "key": "9aab3469ecc263819edf05d8d1d032ae6e3edb904fdc1578462f11e5aa9b7c28",
                "pragma": "no-cache",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "uid": "f0c71c70-ef92-44a0-9cdf-91096986180a",
                "usl": "2021-02-26 00:21",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Mobile Safari/537.36"
            },
            "referrer": "https://eshop.masoutis.gr/categories/index/manabiko?item=566&subitem=011620&subdescr=freska-frouta",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"PassKey\":\"Sc@NnSh0p\",\"Itemcode\":\"566,011620\",\"ItemDescr\":\"0\",\"IfWeight\":1}",
            "method": "POST",
            "mode": "cors"
        });
        const json = await response.json();
        for (let i = 0; i < json.length; i++) {
            let prod = new Product({
                title: json[i].ItemDescr,
                category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
                countedWithQuantity: false,
                image: json[i].PhotoData,
                imageFrom: 'Μασούτης'
            });
            let pri = new Price({
                price: parseFloat(json[i].PosPrice),
                shop: s1._id,
                date: 2021 - 31 - 01
            })
            await pri.save();
            await prod.price.push(pri)
            await prod.save();
        }
    }


    async function crawlSklavenitis() {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1920, height: 1080 }
        });
        const page = await browser.newPage();
        await page.goto('https://www.sklavenitis.gr/freska-froyta-lachanika/froyta/');


        let productTitle = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.product__figure'), e => e.children[0].children[0].title);
            ;
        });

        let productImage = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.product__figure'), e => e.children[0].children[0].src);
            ;
        });

        let productPrice = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.price'), e => e.innerText.slice(0, 4).replace(',', '.'));
        });

        let numberOfProducts = productTitle.length;


        for (let i = 0; i < numberOfProducts; i++) {

            let title = productTitle[i];
            let image = productImage[i];
            let price = parseFloat(productPrice[i]);

            let splitTitle = title.split(' ');
            let correctTitle = `${splitTitle[0]} ${splitTitle[1]} ${splitTitle[2]}`;
            let foundProduct = await Product.findOne({ title: { '$regex': correctTitle, '$options': 'i' } }).populate('Price').populate({
                path: 'price',
                populate: {
                    path: 'shop'
                }
            });;
            if (!foundProduct) {

                let prod = new Product({
                    title: title,
                    category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
                    countedWithQuantity: false,
                    image: image,
                    imageFrom: 'Σκλαβενίτης'
                });
                let pri = new Price({
                    price: price,
                    shop: s19._id,
                    date: 2021 - 02 - 08
                })
                await pri.save();
                await prod.price.push(pri)
                await prod.save();
            } else {
                let exists = false;

                for (let i = 0; i < foundProduct.price.length; i++) {
                    console.log('prod: ', foundProduct.price[i].shop._id)
                    console.log('s2_id: ', s2._id)
                    if (foundProduct.price[i].shop._id.toString() == s2._id.toString()) {

                        console.log('aaa');
                        exists = true;
                    }
                }
                console.log(exists);
                // An den yparxei idi price apo Sklaveniti sto product
                if (!exists) {

                    let pri = new Price({
                        price: price,
                        shop: s2._id,
                        date: 2021 - 02 - 02
                    })
                    await pri.save();
                    await foundProduct.price.push(pri)
                    await foundProduct.save();

                }
            }

        }


        browser.close();
    }

    async function crawlVasilopoulos() {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1920, height: 1080 }
        });
        let page = await browser.newPage();

        let titlesArray = [];
        let imagesArray = [];
        let pricesArray = [];

        for (let pageNumber = 0; pageNumber < 3; pageNumber++) {
            await page.goto(`https://www.ab.gr/click2shop/Oporopoleio/Froyta/c/001001?q=%3Arelevance&pageNumber=${pageNumber}`);


            let productTitle = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.js-responsive-image-replaced'), e => e.alt);
            });

            let productImage = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.js-responsive-image-replaced'), e => e.src);
            });

            let productPrice = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.ProductProperties'), e => e.children[0].children[0].innerText);
            });

            let numberOfProducts = productTitle.length;


            for (let i = 0; i < numberOfProducts; i++) {

                titlesArray.push(productTitle[i]);
                imagesArray.push(productImage[i]);

                let correctPrice;
                if (productPrice[i].indexOf("€") > 0) correctPrice = productPrice[i].slice(0, productPrice[i].indexOf("€")).replace(',', '.');
                else correctPrice = productPrice[i].slice(0, productPrice[i].indexOf('Ε')).replace(',', '.');

                pricesArray.push(correctPrice);



            }
        }



        for (let i = 0; i < titlesArray.length; i++) {

            let title = titlesArray[i];
            let image = imagesArray[i];
            let price = parseFloat(pricesArray[i]);

            let splitTitle = title.split(' ');
            let correctTitle = `${splitTitle[0]} ${splitTitle[1]} ${splitTitle[2]}`;
            let foundProduct = await Product.findOne({ title: { '$regex': correctTitle, '$options': 'i' } }).populate('Price').populate({
                path: 'price',
                populate: {
                    path: 'shop'
                }
            });;
            if (!foundProduct) {

                let prod = new Product({
                    title: title,
                    category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
                    countedWithQuantity: false,
                    image: image,
                    imageFrom: 'ΑΒ Βασιλόπουλος'
                });
                let pri = new Price({
                    price: price,
                    shop: s14._id,
                    date: 2021 - 02 - 08
                })
                await pri.save();
                await prod.price.push(pri)
                await prod.save();
            } else {
                let exists = false;

                for (let i = 0; i < foundProduct.price.length; i++) {
                    console.log('prod: ', foundProduct.price[i].shop._id)
                    console.log('s2_id: ', s2._id)
                    if (foundProduct.price[i].shop._id.toString() == s2._id.toString()) {

                        console.log('aaa');
                        exists = true;
                    }
                }
                console.log(exists);
                // An den yparxei idi price apo AB Vasilopoulo sto product
                if (!exists) {

                    let pri = new Price({
                        price: price,
                        shop: s2._id,
                        date: 2021 - 02 - 02
                    })
                    await pri.save();
                    await foundProduct.price.push(pri)
                    await foundProduct.save();

                }
            }

        }


        browser.close();
    }









    async function crawlMyMarket() {
        const browser = await puppeteer.launch({
            headless: false, // GIA PRODUCTION NA TO VALW TRUE
            defaultViewport: { width: 1920, height: 1080 }
        });
        const page = await browser.newPage();
        await page.goto('https://eshop.mymarket.gr/frouta-lachanika/frouta');

        await page.waitForSelector('.product-info');
        await page.waitForSelector('.product-actions');

        let productTitle = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.product-info'), e => e.innerText.split('\n')[0]);
        });

        let productImage = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.image-style-product-teaser'), e => e.src);
        });

        let productPrice = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.product-actions-row'), e => e.children[0].children[0].innerText.slice(0, 4).replace(',', '.'));
            //return Array.from(document.querySelectorAll('.product-actions'), e => e.innerText.split('\n')[2].slice(0, 4).replace(',', '.'));
        });

        for (let t of productPrice) console.log(t);


        let numberOfProducts = productTitle.length;

        for (let i = 0, j = 0; i < numberOfProducts; i++, j += 2) {

            let title = productTitle[i]
            let image = productImage[i];
            let price = parseFloat(productPrice[j]);


            let splitTitle = title.split(' ');
            let correctTitle = `${splitTitle[0]} ${splitTitle[1]} ${splitTitle[2]}`;
            let foundProduct = await Product.findOne({ title: { '$regex': correctTitle, '$options': 'i' } }).populate('Price').populate({
                path: 'price',
                populate: {
                    path: 'shop'
                }
            });;
            if (!foundProduct) {
                let prod = new Product({
                    title: title,
                    category: ['Φρούτα & Λαχανικά', 'Φρούτα'],
                    countedWithQuantity: false,
                    image: image,
                    imageFrom: 'My market'
                });

                // An i eikona einai base64, vale tin default eikona gia ta frouta
                if (image.slice(0, 4) === 'data') prod.image = 'https://res.cloudinary.com/dlsbinpn6/image/upload/v1612798073/ShopList/default_fruit_xhyovz.jpg';

                let pri = new Price({
                    price: price,
                    shop: s2._id,
                    date: 2021 - 02 - 02
                })
                await pri.save();
                await prod.price.push(pri)
                await prod.save();
            } else {
                let exists = false;

                for (let i = 0; i < foundProduct.price.length; i++) {
                    console.log('prod: ', foundProduct.price[i].shop._id)
                    console.log('s2_id: ', s2._id)
                    if (foundProduct.price[i].shop._id.toString() == s2._id.toString()) {

                        console.log('aaa');
                        exists = true;
                    }
                }
                console.log(exists);
                // An den yparxei idi price apo My market sto product
                if (!exists) {

                    let pri = new Price({
                        price: price,
                        shop: s2._id,
                        date: 2021 - 02 - 02
                    })
                    await pri.save();
                    await foundProduct.price.push(pri)
                    await foundProduct.save();

                }
            }

        }
        browser.close();
    }

    //     fetch("https://eshop.masoutis.gr/WcfScanNShopForWeb/OrdersService.svc/GetPromoItemWithListCouponsSubCategories/", {
    //   "headers": {
    //     "accept": "application/json, text/plain, */*",
    //     "accept-language": "el-GR,el;q=0.9,en-US;q=0.8,en;q=0.7",
    //     "cache-control": "no-cache",
    //     "content-type": "application/json",
    //     "key": "aa1ce1e4d1330b647f5b15d5807ccbd1ad6c7a4e245fc39c430953d4d98b9978",
    //     "pragma": "no-cache",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-origin",
    //     "uid": "f0c71c70-ef92-44a0-9cdf-91096986180a",
    //     "usl": "2021-02-07 16:10",
    //     "cookie": "cookiesession1=523BACBEF5NHS5EYN3CG0MQO0OB08CDD; _gid=GA1.2.2003695284.1612673900; _gat=1; _gat_gtag_UA_24166222_2=1; _ga_9NVDK8HW6S=GS1.1.1612707018.53.0.1612707036.0; _ga=GA1.2.1748580548.1604251795"
    //   },
    //   "referrer": "https://eshop.masoutis.gr/",
    //   "referrerPolicy": "strict-origin-when-cross-origin",
    //   "body": "{\"PassKey\":\"Sc@NnSh0p\",\"Itemcode\":\"0\",\"ItemDescr\":\"0\",\"IfWeight\":1}",
    //   "method": "POST",
    //   "mode": "cors"
    // });


    await crawlHttp();
    await crawlSklavenitis();
    await crawlVasilopoulos();
    await crawlMyMarket();
    console.log("Done seeding");

}

seedDB();