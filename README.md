# itembase [![Build Status](https://travis-ci.org/e-conomic/node-itembase.svg?branch=master)](https://travis-ci.org/e-conomic/node-itembase)

Thin request-like interface for easy access to the itembase REST API from node.js.

	npm install itembase

## Usage

The module returns a [request](https://github.com/request/request) instance, which handles authentication and accepts relative itembase API URLs.

```javascript
var itembase = require('itembase')('access_token');

itembase('/v1/users/:user_id/transactions', function(err, response, body) {
	console.log(body);
});
```

It's also possible to access the sandbox API.

```javascript
var sandbox = require('itembase').sandbox('access_token');
```

## License

[MIT](http://opensource.org/licenses/MIT)
