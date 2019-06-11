/* global process */
/** @module utils */

/** Environment vars */
const { env } = process;
/** Returns and parses an environment var and if does not exists returns the default value
 * @method
 */
const envOr = (key, def, fn = x => x, ienv = env) => fn(typeof key === "string" && ienv[key.toUpperCase()]) || def;

module.exports = {
  envOr
};
