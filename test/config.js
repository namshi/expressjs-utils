const expect = require("chai").expect;
const rewire = require("rewire");
const config = rewire("../config");

const loadFile = config.__get__("loadFile");
const logger = {
  error: function(...msg) {
    this.msg = msg.join("");
  },
  get: function() {
    return this.msg;
  }
};
describe("patterns", function() {
  beforeEach(function() {
    config.__set__("data", null);
  });
  describe(".readConfig", function() {
    it("should return the value of the key", function() {
      const conf = require("../config")("filename.json", () => ({ a: 1 }));
      expect(conf("a")).to.be.equal(1);
    });
    it("should return an error if value of the key does not exist", function() {
      const conf = require("../config")("config.json", () => ({ a: 1 }));
      expect(_ => conf("b")).to.throw("Config -> Key b not found.");
    });
  });
  describe(".loadConfig", function() {
    it("should load the json passed", function() {
      const output = loadFile("filename.json", { logger, fileLoader: () => '{"a":1}' });
      expect(output).deep.equal({ a: 1 });
      expect(logger.get()).equal(undefined);
    });
    it("should crash if anything different than an object is passed", function() {
      expect(_ => loadFile("filename.json", { logger, fileLoader: () => 3 })).to.throw(
        "Config -> filename.json content must be an object."
      );
    });
    it("should log a parse error without crashing if there is data", function() {
      loadFile("filename.json", { logger, fileLoader: () => '{"a":1}' });
      const output = loadFile("filename.json", {
        logger,
        fileLoader: () => {
          throw Error("something happened!");
        }
      });
      expect(logger.get()).equal(
        "Config -> Cannot load or parse the file filename.json, reason Error: something happened!"
      );
    });
  });
});
