const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const supertest = require('supertest');

describe("GET /list", function () {
    it("it should have status code 302", function (done) {
        supertest('http://localhost:3000')
            .get("/list")
            .expect(302)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });

});