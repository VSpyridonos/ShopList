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


//e2e
// describe('the login function', function () {
//     it("should let the user login", async function () {
//         this.timeout(0);
//         const browser = await puppeteer.launch({
//             headless: true,
//             // slowMo: 80,
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

// describe('the register function', function () {
//     it("should let the user register", async function () {
//         this.timeout(0);
//         const browser = await puppeteer.launch({
//             headless: true,
//             // slowMo: 80,
//             defaultViewport: { width: 1920, height: 1080 }
//         });
//         const page = await browser.newPage();
//         await page.goto(
//             'http://localhost:3000/register'
//         );
//         await page.click('input#username');
//         await page.type('input#username', 'testUser');
//         await page.click('input#email');
//         await page.type('input#email', 'testEmail@gmail.com');
//         await page.click('input#password');
//         await page.type('input#password', 'testPassword');
//         await page.click('#register-button');
//         await page.waitForNavigation();
//         let currentPage = await page.evaluate(() => location.href)
//         //browser.close();
//         await assert.equal(currentPage, 'http://localhost:3000/');

//     });
// });

// describe('the showAccount function', function () {
//     it("should let the user access and edit their account details", async function () {
//         this.timeout(0);
//         const browser = await puppeteer.launch({
//             headless: true,
//             // slowMo: 5,
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

//         const page2 = await browser.newPage();
//         await page2.goto(
//             'http://localhost:3000/account'
//         );

//         await Promise.all([
//             page2.waitForNavigation(),
//             page2.evaluate(() => document.getElementById("address").value = "new address"),
//             page2.waitForFunction("document.querySelector('button#submit-changes-button') && document.querySelector('button#submit-changes-button').style.visibility != 'hidden'"),
//             page2.click('button#submit-changes-button')


//         ]);
//         let newAddressText = await page2.$$eval('input', input => input.map((n) => n.value));
//         //browser.close();
//         await assert.equal(newAddressText.toString(), ',new address, Ιωάννινα ');
//     });
// });

// describe('the logout function', function () {
//     it("should let the logged-in user logout", async function () {
//         this.timeout(0);
//         const browser = await puppeteer.launch({
//             headless: true,
//             // slowMo: 5,
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
//         await page.click('a#logout-link');

//         await page.waitForFunction("document.querySelector('a#login-link') && document.querySelector('a#login-link').style.visibility != 'hidden'");
//         let loginLink = await page.$$eval('a#login-link', link => link.map((n) => n.innerHTML));

//         //browser.close();
//         await assert.equal(loginLink.toString(), '<i class="fa fa-sign-in"></i>&nbsp;Σύνδεση');
//     });
// });
