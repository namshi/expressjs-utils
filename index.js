const express = require('express');
const http = require('http');
const json2csv = require('json2csv');

function hc(app) {
  app.get('/public/hc', function(req, res) {
    res.end('OK');
  });
}

/**
 * Detects the API version that's been requested,
 * either from the N-Api-Version header or the
 * URL parameters.
 */
function detectApiVersionMiddleware(req, res, next) {
  let version = parseInt(req.headers['n-api-version']) || parseInt(req.params.apiVersion) || 0;
  req.apiVersion = res.apiVersion = version;

  next();
}

function static(app, path) {
  path = path || '/../../public';

  app.use('/', express.static(__dirname + path));
}

function errorHandler(app) {
  app.use((err, req, res, next) => {
    console.error(err);

    if (app.get('env') == 'dev' && !err.statusCode) {
      throw err;
    }
    err.message = err.statusCode ? err.message : 'Internal Server Error'
    
    res.status(err.statusCode || 500).send({message: err.message, userMessage: err.userMessage || ''});
  });
}

function start(app, port, env) {
  env = env || process.env.NODE_ENV
  port = port || 8082
  if (env !== 'test') {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }

  return app
}

function getRouter(app, svc) {
  let router = express.Router({mergeParams: true})
  app.use(`/${svc}`, router);
  let version = svc ? `/${svc}/v:apiVersion` : `/v:apiVersion`;
  app.use(version, router);
  router.use(detectApiVersionMiddleware);

  return router
}

/**
 * Convenient wrapper to throw an error that has
 * an HTTP status code. These errors are public-friendly,
 * meaning their message can be displayed on the API.
 */
function httpError(code = 500, message = http.STATUS_CODES[code], userMessage) {
  let err = new Error(message);
  err.statusCode = code;
  if (userMessage) {
    err.userMessage = userMessage;
  }

  return err;
}

function serveCSV(res, filename, rows) {
  res.set('Content-Type', 'text/csv');
  res.set('Content-disposition', `attachment; filename=${filename}`);

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
}
