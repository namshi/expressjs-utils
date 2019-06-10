/* global process */

// eslint-disable-next-line no-process-env
const envOr = (key, def, fn = x => x, env = process.env) =>
  fn(typeof key === "string" && env[key.toUpperCase()]) || def;

module.exports = {
  envOr
};
