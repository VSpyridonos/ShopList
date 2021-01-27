const { router } = require('../routes/users');
const { renderRegister } = require('../controllers/users');

var assert = require('assert');
const { render } = require('ejs');

var request = {};
var response = {
    viewName: ""
    , data: {}
    , render: function (view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe("Routing", function () {
    describe("Default Route", function () {
        it("should render the users/register view name", function () {
            renderRegister(request, response);
            assert.strictEqual(response.viewName, 'users/register');
        });

    });
});