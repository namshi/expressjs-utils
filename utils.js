/* global process */

const envOr = (key, def, fn = x => x, env = process.env) =>
  fn(typeof key === "string" && env[key.toUpperCase()]) || def;

module.exports = {
  envOr
};
