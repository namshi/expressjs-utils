/** @module middlewares */
const R = require("ramda");
const { jsonOr } = require("./conversions");
const { vsprintf } = require("sprintf-js");
const _ = require("lodash");

/** Appends data to the request or appends the passed default value
 * @method
 */
const withDataOr = R.curry((key, defaultValue, req, res, next) => {
  req[key] = jsonOr(req.get(key), defaultValue);
  next();
});

/** Blocks with an error any request that does not have the passed content type
 * @method
 */
const hasContentTypes = (
  contentTypes,
  { status = 415, msg = { type: "error", msg: `Unsuported context-type` } } = {}
) => ({ headers }, res, next) =>
  (!contentTypes.includes(headers["content-type"]) && res.status(status).send(msg)) || next();

/** Add language and translation capabilities to the request
 * @method
 */
const withTranslate = R.curry(({ translations, defaultLang, localeHeaderKey, localeQueryKey }, req, res, next) => {
  const localeSplit = (
    (req.query && _.get(req.query, localeQueryKey, null)) ||
    (req.headers && req.headers[localeHeaderKey]) ||
    ""
  )
    .toLowerCase()
    .split(/[-_]/g);
  req.lang = (localeSplit && localeSplit[0]) || defaultLang;
  const { lang } = req;
  req.translate = (text, args = []) => {
    const translation = translations[text] && translations[text][lang] ? translations[text][lang] : text;
    return args.length ? vsprintf(translation, args) : translation;
  };
  next();
});

module.exports = { withDataOr, withTranslate, hasContentTypes };
