/**
 * Created by pratiksanglikar on 13/04/16.
 */

var MongoDB = require("./mongodbhandler");
var Q = require("q");

/**
 * checks if the email id provided is a valid email address.
 * checks if the email id provided is already registered in the system.
 * @param email
 * @returns {promise}
 */
exports.validateEmail = function (email) {
	var promise = Q.defer();

	if(exports.isEmpty(email)) {
		promise.reject("Email ID empty!");
		return promise.promise;
	}

	/* check if the email id provided is a valid email ID */
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!re.test(email)) {
		promise.reject("Invalid email address");
		return promise.promise;
	}

	var found = null;
	var cursor = MongoDB.collection("users").find({ email: email });
	cursor.each(function (error, user) {
		if(error) {
			promise.reject(error);
		}
		if(user != null) {
			found = user;
		} else {
			if(found) {
				promise.reject("Email already registered!");
			} else {
				promise.resolve();
			}
		}
	});
	return promise.promise;
}

/**
 * checks if the given value is empty or not.
 * @returns 'true' if the provided value is empty
 * 			'false' if the provided value is not empty
 * @param value
 */
exports.isEmpty = function (value) {
	if(value === undefined || value === null || value === "") {
		return true;
	}
	return false;
}