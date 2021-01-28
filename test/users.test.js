const { renderRegister, renderLogin, showAccount } = require('../controllers/users');
const assert = require('chai').assert;
const { render } = require('ejs');


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
