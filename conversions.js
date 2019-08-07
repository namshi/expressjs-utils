/** @module conversion */
const R = require("ramda");

/** Executes a function over the data and returns the default value if the function fails
 * @method
 */
const orDefault = R.curry((fn, value, data) => fn(data) || value);

/** Unary version of parseFloat
 * @method
 */
const toFloat = R.unary(parseFloat);
/** Unary version of parseInt
 * @method
 */
const toInt = R.unary(parseInt);

/** Parses the given value to a float or fails to the default value
 * @argument {*} data - usually a string float
 * @returns {float}
 * @method
 */
const toFloatOr = orDefault(toFloat);

/** Parses the given value to a integer or fails to the default value
 * @see test/conversions.js
 * @argument {*} data - usually a string int
 * @returns {int}
 * @example
 * toIntOr("33", 0) // Returns 33;
 * toIntOr("x3x3", 0) // Returns 0;
 * @method
 */
const toIntOr = orDefault(toInt);
/** Given a number returns it only if it's positive
 * @method
 */
const unsignedOr = orDefault(num => num > 0 && num);

/** Given a value parses it to a positive integer and returns the default value if it can't
 * @method
 */
const unsignedIntOr = value =>
  R.compose(
    unsignedOr(value),
    toIntOr(value)
  );
/** Given a value parses it to a positive float and returns the default value if it can't
 * @method
 */
const unsignedFloatOr = value =>
  R.compose(
    unsignedOr(value),
    toFloatOr(value)
  );

/** Sets the number of decimals for a given floar or fails over a default value
 * @method
 */
const setPrecisionOr = R.curry((digits, defValue, num) => toFloat(toFloatOr(defValue, num).toFixed(digits)));

/** Parses the given value to JSON or fails over a default value
 * @argument {*} data - Usually a json string
 * @returns {object}
 * @method
 */
const jsonOr = R.curry((value, defaultValue = {}) => {
  if (!isNaN(value)) {
    return defaultValue;
  }
  try {
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
});

module.exports = {
  orDefault,
  toFloat,
  toFloatOr,
  toInt,
  toIntOr,
  unsignedOr,
  unsignedIntOr,
  unsignedFloatOr,
  setPrecisionOr,
  jsonOr
};
