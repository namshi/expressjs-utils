const R = require('ramda');

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

module.exports = {jsonOr};
