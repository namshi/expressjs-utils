
const expect = require('chai').expect;
const middlewares = require('../middlewares');
const translations = require('./translations')

const res = {};
const next = _=> true;

describe('withDataOr()', function () {
  it('should append parsed JSON', function () {
        let req = { get: x => '{"a":1}'};
        const m = middlewares.withDataOr('test',{});
        m(req,res,next);
        expect(req.test).to.be.eql({a:1});
  });
  it('should append empty JSON object', function () {
        let req = { get: x => '{xrl}3'};
        const m = middlewares.withDataOr('test',{a:1});
        m(req,res,next);
        expect(req.test).to.be.eql({a:1});
   });
});

describe('withLang()', function () {
  it('should return lang in allowed', function () {
        let req = { query:{locale:'ar'} };
        const m = middlewares.withLang(['en','ar'],'en','lang');
        m(req,res,next);
        expect(req.lang).to.be.equal('ar');
  });
  it('should return def lang if not allowed', function () {
        let req = { query:{locale:'it'} };
        const m = middlewares.withLang(['en','ar'],'en','lang');
        m(req,res,next);
        expect(req.lang).to.be.equal('en');
  });
  it('should return lang if not locale but headers', function () {
        let req = { headers:{lang:'ar'} };
        const m = middlewares.withLang(['en','ar'],'en','lang');
        m(req,res,next);
        expect(req.lang).to.be.equal('ar');
  });
  it('should return def lang if nothing', function () {
        let req = {};
        const m = middlewares.withLang(['en','ar'],'en','lang');
        m(req,res,next);
        expect(req.lang).to.be.equal('en');
  });
});

describe('withTranslate()', function(){
      it('should have a translate function', function () {
            const req = {lang: 'ar'}
            const translateMiddleware = middlewares.withTranslate(translations)
            translateMiddleware(req, res, next)
            expect(req.translate('invalidCredentials'))
            .to.be.equal('كلمة السر / البريد الالكتروني الذي تم إدخاله غير صحيح')
      });
})
