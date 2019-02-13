const R = require('ramda');

const toNum = R.curry( (parser,value) => parser(value));
const orDefault = R.curry((fn,value,data) => fn(data) || value);

const toFloat = toNum(parseFloat);
const toInt = toNum(parseInt);

const toFloatOr = orDefault(toFloat)
const toIntOr = orDefault(toInt)
const unsignedOr = orDefault(num => num > 0 && num)

const unsignedIntOr = value => R.compose(unsignedOr(value),toIntOr(value));
const unsignedFloatOr = value => R.compose(unsignedOr(value),toFloatOr(value));

const jsonOr = R.curry((value, defaultValue = {}) => {
    if(!isNaN(value)) {
        return defaultValue;
    }
    try {
        return JSON.parse(value);
    } catch (err) {
        return defaultValue;
    }
});

module.exports = {toNum, toFloat, toInt, toFloatOr, toIntOr, unsignedOr, unsignedIntOr, unsignedFloatOr, jsonOr};
