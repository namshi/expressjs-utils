
const expect = require('chai').expect;
const conversions = require('../conversions');

describe('jsonOr', function () {
  it('should an object if passed an object', function () {
      expect(conversions.jsonOr("{}")).to.be.eql({});
      expect(conversions.jsonOr('{"a":1}')).to.be.eql({a:1});
      expect(conversions.jsonOr('{"a":1, "b":{"c":"hello"}}')).to.be.eql({a:1,b:{c:"hello"}});
  });
  it('should an object if passed an object', function () {
      expect(conversions.jsonOr("xdasf")).to.be.eql({});
      expect(conversions.jsonOr(1)).to.be.eql({});
      expect(conversions.jsonOr("143534")).to.be.eql({});
      expect(conversions.jsonOr("x143534")).to.be.eql({});
      expect(conversions.jsonOr("143534x")).to.be.eql({});
  });
});
