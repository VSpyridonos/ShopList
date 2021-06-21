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


// e2e
describe('the create and delete review function', function () {
    it("create a review and then delete it", async function () {
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
            page2.click('a#product-link'),
            page2.$$eval('textarea', textarea => textarea.innerText = 'Sample review text'),     // allakse to document den to anagnwrizei

        ]);

        await page2.waitForFunction("document.querySelector('button#submit-review-button') && document.querySelector('button#submit-review-button').style.visibility != 'hidden'");
        await page2.click('button#submit-review-button');

        let reviewFromWhole = await page2.$$eval('h6', textarea => textarea.map((n) => n.innerText));
        await assert.equal(reviewFromWhole.toString().substring(5, 12), 'vasilis');

        await page2.waitForFunction("document.querySelector('button#delete-review-button') && document.querySelector('button#delete-review-button').style.visibility != 'hidden'");
        await page2.click('button#delete-review-button');

        await browser.close();

    });
});