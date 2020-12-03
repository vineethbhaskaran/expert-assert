import * as courseRoutes from "../src/routes/courseRoutes";
import chai, { assert } from "chai";
import "mocha";
import chaiHttp from "chai-http";
//let server = require("../src/index");
import { app } from "../src/index";
const should = chai.should();

chai.use(chaiHttp);
describe("hooks", function () {
  before(function () {
    // runs once before the first test in this block
  });

  after(function () {
    // runs once after the first test in this block
  });

  beforeEach(function () {
    // runs before each test in this block
  });

  afterEach(function () {
    // runs after each test in this block
  });

  describe("/Get all courses", () => {
    it("The status should be 200", (done) => {
      chai
        .request(app)
        .get("/courses")
        .end((err, result) => {
          result.should.have.status(200);
          result.should.be.an("object");
          done();
        });
    });
    it("result should be an object", (done) => {
      chai
        .request(app)
        .get("/courses")
        .end((err, result) => {
          result.should.be.an("object");
          done();
        });
    });
    it("result should exist", (done) => {
      chai
        .request(app)
        .get("/courses")
        .end((err, result) => {
          console.log(JSON.stringify(result));
          should.exist(result);
          done();
        });
    });
    it("result should have property data which is an array w", (done) => {
      chai
        .request(app)
        .get("/courses")
        .end((err, result) => {
          console.log(JSON.stringify(result.body));
          result.body.should.have.property("data").which.is.an("array");
          done();
        });
    });
  });
});