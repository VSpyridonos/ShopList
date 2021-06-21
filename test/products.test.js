const { index, showProduct } = require('../controllers/products');
const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const should = chai.should();
const { render } = require('ejs');
const sinon = require('sinon');
const Product = require('../models/product');
const { router } = require('../routes/products');
const supertest = require('supertest');
const puppeteer = require('puppeteer');
const { app } = require('../app');


describe("GET /products", function () {
    it("it should have status code 200", function (done) {
        supertest("http://localhost:3000")
            .get("/products")
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

});

describe("GET product by searching", function () {
    it("it should have status code 200", function (done) {
        supertest("http://localhost:3000")
            .get("/products?search=Zagorin")
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

});

describe("GET a specific product category", function () {
    it("it should have status code 200", function (done) {
        supertest("http://localhost:3000")
            .get(`/categories/${encodeURI('Αλλαντικά')}`)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

});


// e2e
describe('the addProductToList and edit product quantity functions', function () {
    it("should add a product to the list, confirm it is displayed, increase its quantity and confirm it was increased", async function () {
        this.timeout(0);
        const browser = await puppeteer.launch({
            headless: true,
            //slowMo: 80,
            defaultViewport: { width: 1920, height: 1080 }
        });
        const page = await browser.newPage();
        await page.goto(
            'http://localhost:3000/login'
        );
        await page.click('input#username');
        await page.type('input#username', 'vasilis');
        await page.click('input#password');
        await page.type('input#password', 'vasilis');
        await page.click('#login-button');
        await page.waitForNavigation();
        const page2 = await browser.newPage();
        await page2.goto(
            'http://localhost:3000/products'
        );

        await Promise.all([
            page2.waitForNavigation(),
            page2.click('a#product-link')
        ]);

        let product = await page2.$$eval('h2.card-title', (h2) => h2.map((n) => n.innerText));
        let productUrl = page2.url();

        const page3 = await browser.newPage();
        await page3.goto(productUrl);

        await Promise.all([
            page3.waitForNavigation(),
            page3.click('button#add-to-list-button')
        ]);

        const page4 = await browser.newPage();
        await page4.goto(
            'http://localhost:3000/list'
        );

        let productNameOnList = await page4.$$eval('span#product-title', (span) => span.map((n) => n.innerText));
        let oldProductQuantitySpan = await page4.$$eval('span#product-quantity', (span) => span.map((n) => n.innerText));
        let oldProductQuantity = parseInt(oldProductQuantitySpan.toString().split(' ')[1]);
        await page4.click('a#increase-quantity-button');
        let newProductQuantitySpan = await page4.$$eval('span#product-quantity', (span) => span.map((n) => n.innerText));
        let newProductQuantity = parseInt(newProductQuantitySpan.toString().split(' ')[1]);

        await assert.equal(product.toString().trim(), productNameOnList);
        await assert.equal(oldProductQuantity + 1, newProductQuantity);

        await browser.close();

    });
});

