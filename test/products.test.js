const { index } = require('../controllers/products');
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
const { app } = require('../app');



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
        supertest('http://localhost:3000')
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
        supertest('http://localhost:3000')
            .get("/products?search=Zagorin")
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

});
