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
//const sinonChai = require('sinon-chai');
//const { mockReq, mockRes } = require('sinon-express-mock');



// const request = {
//     query: {
//         search: 'Zagorin'
//     }
// };
// let response = {
//     viewName: ""
//     , data: {}
//     , render: function (view, viewData) {
//         this.viewName = view;
//         this.data = viewData;
//     }
// };


// describe('/GET product via searching', () => {
//     it('it should GET the product from the search query', (done) => {
//         chai.request('http://localhost:3000')
//             .get('/products?search=Zagorin')
//             .end(function (err, res) {
//                 console.log('edwww:', res)
//                 done();
//             });
//     });
// });

// describe("the index function", function () {
//     it("should render /products?search=Zagorin", function () {
//         var nextSpy = sinon.spy(next);
//         //index(request, response, null);
//         //assert.equal(response.viewName, '/products?search=Zagorin');
//         expect(index(request, response, nextSpy)).to.be.a('string');
//     });
// });

// describe('Route Index', () => {
//     it('should render the products index view', (done) => {
//         chai.request('http://localhost:3000')
//             .get('/products')
//             .end((err, res) => {
//                 console.log('res=====', res);
//                 expect(res).to.have.status(200);
//                 expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
//                 //expect(res.text).to.contain('Express');
//                 done();
//             });
//     });
// });

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
describe('the add product to list function', function () {
    it("should add a product to the list and confirm it is displayed", async function () {
        this.timeout(0);
        const browser = await puppeteer.launch({
            headless: false,
            // slowMo: 80,
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
        // await page.click('a#products-link');
        // const [response] = await Promise.all([
        //     page.waitForNavigation(),
        //     page.click('a#products-link'),
        // ]);
        // await page.click('#milk-product-link')
        const page2 = await browser.newPage();
        await page2.goto(
            'http://localhost:3000/products'
        );

        // await page2.click('a#milk-product-link');
        // await page.waitForNavigation();

        await Promise.all([
            page2.waitForNavigation(),
            page2.click('a#product-link'),
            page2.click('button#add-to-list-button'),
            page2.waitForNavigation(),
        ]);

        const page3 = await browser.newPage();
        await page3.goto(
            'http://localhost:3000/list'
        );

        await browser.close();

    });
});

