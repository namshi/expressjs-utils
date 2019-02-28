const R = require('ramda');

const orDefault = R.curry((fn,value,data) => fn(data) || value);

const toFloat = R.unary(parseFloat);
const toInt = R.unary(parseInt);

const toFloatOr = orDefault(toFloat)
const toIntOr = orDefault(toInt)
const unsignedOr = orDefault(num => num > 0 && num)

const unsignedIntOr = value => R.compose(unsignedOr(value),toIntOr(value));
const unsignedFloatOr = value => R.compose(unsignedOr(value),toFloatOr(value));

const setPrecisionOr = R.curry((digits, defValue, num) => {
    return toFloat(toFloatOr(defValue, num).toFixed(digits));
});

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

module.exports = {orDefault, toFloat, toFloatOr, toInt, toIntOr, unsignedOr, unsignedIntOr, unsignedFloatOr, setPrecisionOr, jsonOr};
