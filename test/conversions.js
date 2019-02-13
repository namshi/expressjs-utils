
const expect = require('chai').expect;
const conversions = require('../conversions');

describe('conversions()', function () {
  it('should apply a parser to a function', function () {
      expect(conversions.toNum(x => x +1, 1)).to.be.equal(2);
  });
  it('should parseNum to a float', function () {
      expect(conversions.toFloat('1.1')).to.be.equal(1.1);
      expect(isNaN(conversions.toFloat('x1.1'))).to.be.equal(true);
  });
  it('should parseNum to a float or 0', function () {
      expect(conversions.toFloatOr(0,'1.1')).to.be.equal(1.1);
      expect(conversions.toFloatOr(0,'x1.1')).to.be.equal(0);
  });
  it('should parseNum to a int', function () {
      expect(conversions.toInt('1')).to.be.equal(1);
      expect(isNaN(conversions.toInt('x1'))).to.be.equal(true);
  });
  it('should parseNum to a int or 0', function () {
      expect(conversions.toIntOr(0,'1')).to.be.equal(1);
      expect(conversions.toIntOr(0,'x1')).to.be.equal(0);
  });
  it('should parseNum to a int if positive or 0', function () {
      expect(conversions.unsignedOr(0,1)).to.be.equal(1);
      expect(conversions.unsignedOr(0,-1)).to.be.equal(0);
  });
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
