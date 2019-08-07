const expect = require("chai").expect;
const rewire = require("rewire");
const { envOr } = require("../utils");

describe("utils", function() {
  describe(".envOr", function() {
    it("should return default value if not found", function() {
      expect(envOr("unexistent", 33)).to.be.equal(33);
    });
    it("should return the key if found", function() {
      expect(envOr("key", 33, x => x, { KEY: "22" })).to.be.equal("22");
    });
    it("should post process the value with the function if found", function() {
      expect(envOr("key", 33, parseInt, { KEY: "22" })).to.be.equal(22);
    });
  });
});
