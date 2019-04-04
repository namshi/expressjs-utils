/*global __dirname process */
const express = require("express");
const http = require("http");
const json2csv = require("json2csv");
const conversions = require("./conversions");
const middlewares = require("./middlewares");

//FP
const pipe = (...fn) => input =>
  fn.reduce((chain, func) => (chain instanceof Promise ? chain.then(func) : func(chain)), input);

function hc(app) {
  app.get("/public/hc", function(req, res) {
    res.end("OK");
  });
}

/**
 * Detects the API version that's been requested,
 * either from the N-Api-Version header or the
 * URL parameters.
 */
function detectApiVersionMiddleware(req, res, next) {
  let version = parseInt(req.headers["n-api-version"]) || parseInt(req.params.apiVersion) || 0;
  req.apiVersion = res.apiVersion = version;

  next();
}

function static(app, path) {
  path = path || "/../../public";

  app.use("/", express.static(__dirname + path));
}

/**
 * Configures the app with an error handler.
 * A message and userMessage field is added to the error's json body. The userMessage is a translated
 * version of the message field if translation is properly configured for this middleware. You can set
 * both fields explicitly in the error response by setting err.data to the desired object.
 */
function errorHandler(app, logger) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    err.message = err.message ? err.message : "Empty error message";

    if (logger) {
      logger.error &&
        logger.error(err, {
          status: statusCode,
          method: req.method,
          route: req.path
        });
    } else {
      console.error(err);
    }

    const translatedMessage = req.translate ? req.translate(err.message) : err.message;

    if (app.get("env") == "dev" && !err.statusCode) {
      throw err;
    }

    if (err.data) {
      res.status(statusCode).send(err.data);
      return;
    }

    res.status(statusCode).send({
      message: err.statusCode ? err.message : "Internal Server Error",
      userMessage: err.statusCode ? translatedMessage : "Internal Server Error"
    });
  });
}

function start(app, port, env) {
  env = env || process.env.NODE_ENV;
  port = port || 8082;
  if (env !== "test") {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }

  return app;
}

function getRouter(app, svc) {
  let router = express.Router({ mergeParams: true });
  app.use(`/${svc}`, router);
  let version = svc ? `/${svc}/v:apiVersion` : `/v:apiVersion`;
  app.use(version, router);
  router.use(detectApiVersionMiddleware);

  return router;
}

/**
 * Convenient wrapper to throw an error that has
 * an HTTP status code. These errors are public-friendly,
 * meaning their message can be displayed on the API.
 */
function httpError(code = 500, message = http.STATUS_CODES[code]) {
  let err = new Error();
  err.statusCode = code;
  err.message = message;

  if (typeof message === "object") {
    err.message = JSON.stringify(message);
    err.data = message;
  }

  return err;
}

function serveCSV(res, filename, rows) {
  res.set("Content-Type", "text/csv");
  res.set("Content-disposition", `attachment; filename=${filename}`);

  return res.send(json2csv({ data: rows }));
}

module.exports = {
  hc,
  static,
  errorHandler,
  start,
  getRouter,
  httpError,
  serveCSV,
  pipe,
  ...conversions,
  ...middlewares
};
