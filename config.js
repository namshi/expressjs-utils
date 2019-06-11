/* eslint-disable no-sync */
/* global __dirname */
/** @module config */
const memoizee = require("memoizee");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { envOr } = require("./utils");

/** Global state where we store the config */
let data = null;

/** Loads a configuration file and fails over the previous loaded data. Crashes if there is no previous data
 * @method
 */
const loadConfig = (filename = "config.json", { logger = console, fileLoader = fs.readFileSync } = {}) => {
  try {
    const content = JSON.parse(
      fileLoader(filename && filename.startsWith("..") ? `${path.join(__dirname, filename)}` : filename, "utf8")
    );
    if (typeof content === "object") {
      data = content;
    }
  } catch (err) {
    logger.error(`Config -> Cannot load or parse the file ${filename}, reason `, err);
  }
  if (typeof data !== "object" || data === null) {
    throw Error(`Config -> ${filename} content must be an object.`);
  }
  return data;
};

/** Cached version of loadConfig
 * @method
 */
const cachedLoader = memoizee(loadConfig, { maxAge: envOr("config_ttl", 60000, parseInt) });

/** Loads the config and returns the passed key or the entire object if the key is empty. Crashes on not found key
 * @method
 */
const getConf = (filename, loader = cachedLoader) => (key, def) => {
  const config = loader(filename);
  if (!key) {
    return config;
  }
  const value = _.get(config, key, def);

  if (typeof value === "undefined") {
    throw Error(`Config -> Key ${key} not found.`);
  }

  return value;
};
module.exports = getConf;
