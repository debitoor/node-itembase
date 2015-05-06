var nock = require('nock');
var concat = require('concat-stream');
var pump = require('pump');

var itembase = require('../');

var mock = function() {
	return nock('https://api.itembase.io', {
			reqheaders: {
				Authorization: 'Bearer access_token'
			}
		})
		.get('/v1/users/user_id/buyers')
		.reply(200, {
			num_documents_found: 1,
			num_documents_returned: 1,
			documents: [
				{
					id: 'bf7b88593ca4f70d5b5fdd4',
					source_id: 'f780cb0def886095f7262e140d348bf412bce2e42b96f0124ed24508694401e6',
					original_reference: '975dfc4accd1c71f5e690',
					created_at: '2015-04-17T10:11:30.679+0200',
					updated_at: '2015-04-17T10:13:07.679+0200'
				}
			]
		});
};

describe('itembase api', function() {
	describe('get buyers', function() {
		var server = mock();
		var result;

		before(function(done) {
			var request = itembase('access_token');
			request.get('/v1/users/user_id/buyers', function(err, response, body) {
				result = body;
				done(err);
			});
		});

		it('should return valid body', function() {
			expect(result).to.deep.equal({
				num_documents_found: 1,
				num_documents_returned: 1,
				documents: [
					{
						id: 'bf7b88593ca4f70d5b5fdd4',
						source_id: 'f780cb0def886095f7262e140d348bf412bce2e42b96f0124ed24508694401e6',
						original_reference: '975dfc4accd1c71f5e690',
						created_at: '2015-04-17T10:11:30.679+0200',
						updated_at: '2015-04-17T10:13:07.679+0200'
					}
				]
			});
		});

		it('should have called all mocks', function() {
			expect(server.isDone()).to.be.ok();
		});
	});

	describe('stream buyers', function() {
		var server = mock();
		var result;

		before(function(done) {
			var request = itembase('access_token');
			var sink = concat({ encoding: 'string' }, function(data) {
				result = JSON.parse(data);
			});

			pump(request.get('/v1/users/user_id/buyers'), sink, done);
		});

		it('should return valid body', function() {
			expect(result).to.deep.equal({
				num_documents_found: 1,
				num_documents_returned: 1,
				documents: [
					{
						id: 'bf7b88593ca4f70d5b5fdd4',
						source_id: 'f780cb0def886095f7262e140d348bf412bce2e42b96f0124ed24508694401e6',
						original_reference: '975dfc4accd1c71f5e690',
						created_at: '2015-04-17T10:11:30.679+0200',
						updated_at: '2015-04-17T10:13:07.679+0200'
					}
				]
			});
		});

		it('should have called all mocks', function() {
			expect(server.isDone()).to.be.ok();
		});
	});
});
