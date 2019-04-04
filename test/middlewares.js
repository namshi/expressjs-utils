const expect = require("chai").expect;
const middlewares = require("../middlewares");
const translations = require("./translations");

const res = {};
const next = _ => true;

describe("withDataOr()", function() {
  it("should append parsed JSON", function() {
    let req = { get: x => '{"a":1}' };
    const m = middlewares.withDataOr("test", {});
    m(req, res, next);
    expect(req.test).to.be.eql({ a: 1 });
  });
  it("should append empty JSON object", function() {
    let req = { get: x => "{xrl}3" };
    const m = middlewares.withDataOr("test", { a: 1 });
    m(req, res, next);
    expect(req.test).to.be.eql({ a: 1 });
  });
});

describe("hasContentTypes()", function() {
  const req = { headers: { "content-type": "application/json" } };
  const res = { status: status => ({ send: msg => ({ ...msg, status }) }) };

  it("should call next if content type exists", function() {
    const m = middlewares.hasContentTypes(["text/plain", "application/json"]);
    expect(m(req, res, next)).to.be.equal(true);
  });

  it("should send an error if does not exist", function() {
    const m = middlewares.hasContentTypes(["text/plain"]);
    expect(m(req, res, next)).to.be.eql({
      status: 415,
      type: "error",
      msg: "Unsuported media type"
    });
  });
});

describe("withTranslate()", function() {
  it("should use the default language if no language is passed", () => {
    const req = {};
    const translateMiddleware = middlewares.withTranslate({
      translations,
      defaultLang: "en"
    });
    translateMiddleware(req, res, next);
    expect(req.translate("invalidCredentials")).to.be.equal("Incorrect email or password");
  });

  it("should use the default language if no language is passed even when query param settings are set in config", () => {
    const req = {};
    const translateMiddleware = middlewares.withTranslate({
      translations,
      defaultLang: "en",
      localeQueryKey: "locale"
    });
    translateMiddleware(req, res, next);
    expect(req.translate("invalidCredentials")).to.be.equal("Incorrect email or password");
  });

  it("should use the default language if no language is passed even when header key settings are set in config", () => {
    const req = {};
    const translateMiddleware = middlewares.withTranslate({
      translations,
      defaultLang: "en",
      localeHeaderKey: "locale"
    });
    translateMiddleware(req, res, next);
    expect(req.translate("invalidCredentials")).to.be.equal("Incorrect email or password");
  });

  it("should use the query param settings for lang when no header is passed", () => {
    const req = { query: { lang: "ar" } };
    const translateMiddleware = middlewares.withTranslate({
      translations,
      defaultLang: "en",
      localeQueryKey: "lang"
    });
    translateMiddleware(req, res, next);
    expect(req.translate("invalidCredentials")).to.be.equal("كلمة السر / البريد الالكتروني الذي تم إدخاله غير صحيح");
  });

  it("should use the header locale settings when no query params", () => {
    const req = { headers: { locale: "ar" } };
    const translateMiddleware = middlewares.withTranslate({
      translations,
      defaultLang: "en",
      localeHeaderKey: "locale"
    });
    translateMiddleware(req, res, next);
    expect(req.translate("invalidCredentials")).to.be.equal("كلمة السر / البريد الالكتروني الذي تم إدخاله غير صحيح");
  });

  it.skip("should have a translate function", function() {
    const req = { lang: "ar" };
    const translateMiddleware = middlewares.withTranslate(translations);
    translateMiddleware(req, res, next);
    expect(req.translate("invalidCredentials")).to.be.equal("كلمة السر / البريد الالكتروني الذي تم إدخاله غير صحيح");
  });
});
