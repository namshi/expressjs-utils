const R = require('ramda');
const {jsonOr} = require('./conversions');
const { vsprintf } = require('sprintf-js')

const withDataOr = R.curry((key, defaultValue, req, res, next) => {
    req[key] = jsonOr(req.get(key), defaultValue);
    next();
});

const withLang = R.curry((allowed, defaultLang, key, req, res, next) => {
    const raw = (req.query && req.query.locale || req.headers && req.headers[key] || '').toLowerCase().split(/[-_]/g);
    req.lang = raw && allowed.includes(raw[0]) && raw[0] || defaultLang;
    next()
});

//Requires withLang
const withTranslate = R.curry((translations, req, res, next) => {
    const {lang} = req;
    req.translate = (text, args = []) => {
        const translation = translations[text] && translations[text][lang]? translations[text][lang] : text
        return args.length ? vsprintf(translation, args) : translation;
    }
    next()
});

module.exports = {withDataOr, withLang, withTranslate};
