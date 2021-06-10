const chai = require('chai');
const chaiHttp = require("chai-http");
const review = require('../models/review');
chai.use(chaiHttp);
const supertest = require('supertest');
const puppeteer = require('puppeteer');


e2e
describe('the createReview function', function () {
    it("create a review and then delete it", async function () {
        this.timeout(0);
        const browser = await puppeteer.launch({
            headless: false,
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
            // page2.click('label[title="Amazing"]'),
            // page2.click('textarea#body'),
            document.querySelector('textarea#body').innerText = 'memes',     // allakse to document den to anagnwrizei
            page2.type('textarea#body', 'Sample review text'),
            page2.click('button#submit-review-button'),
        ]);

        await page.waitForTimeout(3000);

        await Promise.all([
            document.querySelector('textarea#body').innerText = 'memes',
            page2.click('button#submit-review-button'),
        ]);

        let reviewFrom = await document.getElementsByTagName("h6")[0][textContent].trim().split(' ')[1];
        await assert.equal(reviewFrom, 'vasilis');

        await browser.close();

    });
});