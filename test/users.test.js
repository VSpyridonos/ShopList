const { renderRegister, renderLogin, showAccount } = require('../controllers/users');
const assert = require('chai').assert;
const { render } = require('ejs');
const puppeteer = require('puppeteer');
const chai = require('chai');
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);


const request = {};
let response = {
    viewName: ""
    , data: {}
    , render: function (view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};


describe("the renderRegister function", function () {
    it("should render the users/register view name", function () {
        renderRegister(request, response);
        assert.equal(response.viewName, 'users/register');
    });
});

describe("the renderLogin function", function () {
    it("should render the users/login view name", function () {
        renderLogin(request, response);
        assert.equal(response.viewName, 'users/login');
    });
});

describe("the showAccount function", function () {
    it("should render the users/account view name", function () {
        showAccount(request, response);
        assert.equal(response.viewName, 'users/account');
    });
});


// e2e
// describe('the login function', function () {
//     it("should let the user login", async function () {
//         this.timeout(0);
//         const browser = await puppeteer.launch({
//             headless: false,
//             slowMo: 80,
//             defaultViewport: { width: 1920, height: 1080 }
//         });
//         const page = await browser.newPage();
//         await page.goto(
//             'http://localhost:3000/login'
//         );
//         await page.click('input#username');
//         await page.type('input#username', 'vasilis');
//         await page.click('input#password');
//         await page.type('input#password', 'vasilis');
//         await page.click('#login-button');
//         await page.waitForNavigation();
//         let currentPage = await page.evaluate(() => location.href)
//         //browser.close();
//         await assert.equal(currentPage, 'http://localhost:3000/');

//     });
// });
