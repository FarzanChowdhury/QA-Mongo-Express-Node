const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const server = require("../index");
const Cat = require("../db");

describe("Test Cat", () => {
  let testCat;

  beforeEach((done) => {
    Cat.deleteMany((err) => {
      if (!err) {
        Cat.create(
          {
            name: "Holly",
            breed: "Persian",
            age: 17,
          },
          (err, created) => {
            if (!err) {
              testCat = created;
              return done();
            }
          }
        );
      }
    });
  });

  it("Should create a Cat", (done) => {
    chai
      .request(server)
      .post("/cat/create")
      .send({
        name: "John",
        breed: "Tabby",
        age: 12,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.haveOwnProperty("text", "Sucessfully Created");
        return done();
      });
  });

  it("Should not create a Cat", (done) => {
    chai
      .request(server)
      .post("/cat/create")
      .send()
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res).to.haveOwnProperty(
          "text",
          "Cat validation failed: age: Path `age` is required., breed: Path `breed` is required., name: Path `name` is required."
        );
        return done();
      });
  });
  it("Should find a Cat", (done) => {
    chai
      .request(server)
      .get("/cat/get/" + testCat.id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty("name", "Holly");
        expect(res.body).to.haveOwnProperty("breed", "Persian");
        expect(res.body).to.haveOwnProperty("age", 17);
        return done();
      });
  });
  it("Should delete a Cat", (done) => {
    chai
      .request(server)
      .delete("/cat/remove/" + testCat.id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        return done();
      });
  });
  it("Should get all Cats", (done) => {
    chai
      .request(server)
      .get("/cat/getAll")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("array");
        expect(res.body).length(1);
        return done();
      });
  });
  it("Should update a Cat", (done) => {
    chai
      .request(server)
      .put("/cat/replace/" + testCat.id)
      .send({
        name: "Adil",
        breed: "Tabby",
        age: 12,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(202);
        expect(res.body).to.haveOwnProperty("name", "Holly");
        expect(res.body).to.haveOwnProperty("breed", "Persian");
        expect(res.body).to.haveOwnProperty("age", 17);
        return done();
      });
  });
});
