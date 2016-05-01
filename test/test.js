/**
 * Created by pratiksanglikar on 01/05/16.
 */
/**
 * Created by pratiksanglikar on 18/03/16.
 */
var request = require('request'),
	assert = require("assert"),
	http = require("http");

describe("url tests", function() {
	it("Should redirect to login page", function(done) {
		http.get("http://localhost:3000/trips", function(res) {
			assert.equal(403, res.statusCode);
			done();
		});
	});

	it("Should return status 404 if incorrect url is specified", function(done){
		http.get("http://localhost:3000/negativetest", function(res) {
			assert.equal(404, res.statusCode);
			done();
		});
	});

	it("Should NOT authenticate the user on incorrect twitterHandle password combination", function(done) {
		request.post(
			"http://localhost:3000/auth/login",
			{ form:
			{
				twitterHandle: "pratiksanglikar",
				password:"pratik12345"
			}
			},
			function (error, response) {
				var responseJSON = JSON.parse(response.body);
				assert.equal(false, responseJSON.success);
				done();
			}
		);
	});

	it("Should authenticate user on correct username and password", function (done) {
		request.post(
			"http://localhost:3000/auth/login",
			{ form:
			{
				email: "admin@gmail.com",
				password:"1"
			}
			},
			function (error, response) {
				var responseJSON = JSON.parse(response.body);
				assert.equal(true, responseJSON.success);
				done();
			});
	});

	it("Should logout the user", function (done) {
		request.get(
			"http://localhost:3000/auth/logout",
			function (error, response) {
				assert.equal(200, response.statusCode);
				done();
			});
	});
});