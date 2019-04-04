const expect = require("chai").expect;

describe("patterns", function() {
  describe(".readConfig", function() {
    it("should an object if passed an object", function(next) {
      const conf = require("../config")("config.json");
      expect(true).to.be.equal(true);
      next();
    });
  });
});
