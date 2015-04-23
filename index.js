var request = require('request');

var defaults = function(baseUrl) {
	return function(token) {
		return request.defaults({}, function(options, callback) {
			if (options.url) {
				options.uri = options.url;
				delete options.url;
			}
			if (options.uri[0] === '/') {
				options.uri = baseUrl + options.uri;
			}

			options.jar = false;
			options.headers = options.headers || {};
			options.headers.Authorization = 'Bearer ' + token;

			if (!('json' in options) && callback) {
				options.json = true;
			}

			return request(options, callback);
		});
	};
};

var api = defaults('https://api.itembase.io');
api.sandbox = defaults('http://sandbox.api.itembase.io');

module.exports = api;
