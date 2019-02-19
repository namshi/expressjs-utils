const R = require('ramda');
const {jsonOr} = require('./conversions');
const { vsprintf } = require('sprintf-js')
const _ = require('lodash')

const withDataOr = R.curry((key, defaultValue, req, res, next) => {
    req[key] = jsonOr(req.get(key), defaultValue);
    next();
});

const withTranslate = R.curry(({
    translations, 
    defaultLang, 
    localeHeaderKey, 
    localeQueryKey }, req, res, next) => {

    const localeSplit = ((req.query && _.get(req.query, localeQueryKey, null)) || (req.headers && req.headers[localeHeaderKey]) || '').toLowerCase().split(/[-_]/g);
    req.lang = localeSplit && localeSplit[0] || defaultLang;
    const {lang} = req;
    req.translate = (text, args = []) => {
        const translation = translations[text] && translations[text][lang]? translations[text][lang] : text
        return args.length ? vsprintf(translation, args) : translation;
    }
    next()
});

module.exports = {withDataOr, withTranslate};
