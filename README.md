# expressjs-utils
This module contains a set of utilities that make our life easier while writing express apps.

## Installation

``` bash
$ yarn add expressjs-utils
```
``` bash
$ npm install expressjs-utils
```

## Usage
``` js

  const utils = require('expressjs-utils');

```
### start

`start(app, port, env)`

starts the express server unless you're in the test env

``` js
  // starts your app on port 8082 with environment set to 'test'
  utils.start(app, 8082, 'test');

```

### static

`static(app, path)`

mounts the static, `/public` folder

``` js
  // assuminc your public folder is located at '/../../public'
  utils.static(app);

  // if it is located somewhere else, just pass the path, relative to the current file.
  utils.static(app, '/../public');

```

### getRouter
`getRouter(app, prefix)`

returns a router that prefixes all routes at `/prefix` & `/prefix/vX` or `/vX`, where `X` is a specific version of your api. Use it for API versioning & when you need a common prefix.
If no API version is passed, that is `vX` is not present in the url, it will be set to 0 by default. You can access the API Version using `req.apiVersion`.

``` js

  let router = utils.getRouter(app, 'api');
  router.get('/cars', (req, res, next) => {
    return res.json({...});
  });

  // Possible endpoint formats
  /api/v1/cars //req.apiVersion will be 1 here
  /api/cars //req.apiVersion will be 0 here

  let router = utils.getRouter(app, '');
  router.get('/people', (req, res, next) => {
    return res.json({...});
  });

  // Possible endpoint formats
  /v1/people //req.apiVersion will be 1 here
  /people   
  //req.apiVersion will be 0 here

```

### errorHandler

`errorHandler(app)`
provides a generic error handler that can be used at the "end" of your app

``` js
  // Add this after all your routes
  utils.errorHandler(app);

  // Then in any route you can simply call next(err) whenever an error occurs
  router.post('/cars', async(req, res, next) => {
    try {
      let result = await getCars();
    } catch (err) {
      next(err);
    }
  });

```

### httpError

`httpError(code=500, message='Internal Server Error')`

Throws an error that has an HTTP status code. These errors are public-friendly, therefore their message can be displayed on the API.

``` js
  // if you are using the error handler above, you can do something like this in
  // any of your API endpoint
  router.get('/users/:id', async(req, res, next) => {
    try {
      let user = await getUser(req.params.id);

      if (!user) {
        return next(utils.httpError(404, 'Not found'));
      }
    } catch (err) {
      next(err);
    }
  });

```

### serveCSV
`serveCSV(res, filename, rows)`

returns a downloadable csv file built from "rows" which is an array of objects.

``` js
  router.get('/data', async(req, res, next) => {
    let data = [{name: "Test 0", age: 3}, {name: "Test 1", age: 4}];

    return utils.serveCSV(res, "data.csv", data);
  });

```
