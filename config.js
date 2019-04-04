/* global __dirname process*/
const memoizee = require("memoizee");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");

/*
 * const config = require('expressjs-utils/config')('./conf.json');
 */
const loadConfig = (file, override = {}, logger = console) => {
  try {
    const content = JSON.parse(
      fs.readFileSync(file && file.startsWith("..") ? `${path.join(__dirname, file)}` : file, "utf8")
    );
    if (typeof content === "object") {
      this.data = content;
    }
  } catch (err) {
    logger.error(`loadConfig -> Cannot load the config file: ${file}, error:`, err);
  }
  if (typeof this.data !== "object") {
    throw Error(`loadConfig -> Failed to boot config file: ${file}.`);
  }
  return _.partial(_.get, { ...this.data, ...override });
};

module.exports = memoizee(loadConfig, { maxAge: process.env.READ_CONFIG_TIMEOUT || 60000 });
