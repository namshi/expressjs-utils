/* global __dirname */
const memoizee = require("memoizee");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { envOr } = require("./utils");

let data = null;

// eslint-disable-next-line no-sync
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

const cachedLoader = memoizee(loadConfig, { maxAge: envOr("config_ttl", 60000, parseInt) });

module.exports = (filename, loader = cachedLoader) => (key, def) => {
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
