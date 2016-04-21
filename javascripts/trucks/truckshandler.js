/**
 * Created by pratiksanglikar on 13/04/16.
 */
var MongoDB = require("../commons/mongodbhandler");
var Utilities = require("../commons/utilities");
var PasswordManager = require("../authentication/passwordmanager");
var Q = require("q");
var UserTypes = require("../commons/constants").usertypes;

/**
 * function to sign up the new truck driver.
 * @param info
 * @returns {*|promise}
 */
exports.signuptruck = function (info) {
	var deferred = Q.defer();
	var promise = _validateTrucksInfo(info);
	promise.done(function () {
		info = _sanitizeTrucksInfo(info);
		var cursor = MongoDB.collection("users").insert(info);
		cursor.then(function (user) {
			deferred.resolve(user);
		}).catch(function (error) {
			deferred.reject(error);
		});
	}, function (error) {
		deferred.reject(error);
	});
	return deferred.promise;
};

/**
 * deletes a driver with given ssn from the system.
 * @param ssn
 * @returns {*|promise}
 */
exports.delete = function (ssn) {
	ssn = Number(ssn);
	var deferred = Q.defer();
	MongoDB.collection("users").remove({
		"ssn": ssn
	}, function (err, numberOfRemoved) {
		if(err) {
			deferred.reject(err);
		}
		if(numberOfRemoved.result.n) {
			deferred.resolve();
		} else {
			deferred.reject("Driver with given SSN not found in system!");
		}
	});
	return deferred.promise;
}


exports.getAllTrucks = function () {
	
}

/**
 * function to sanitize the provided input.
 * @param info
 * @private
 */
_sanitizeTrucksInfo = function (info) {
	info.password = PasswordManager.encryptPassword(info.password);
	info.usertype = UserTypes.DRIVER;
	return info;
}

/**
 * function to validate the given input.
 * validations provided -
 * 		check if the email id is already registered.
 * 		check if values are provided for all required fields.
 * @param info
 * @returns {*|promise}
 * @private
 */
_validateTrucksInfo = function (info) {
	var deferred = Q.defer();
	var promise = Utilities.validateEmail(info.email);
	var promise1 = Utilities.validateSSN(info.ssn);
	Q.all([promise, promise1]).done(function () {
		if( Utilities.isEmpty(info.ssn)		 	||
			Utilities.isEmpty(info.firstName) 	||
			Utilities.isEmpty(info.lastName) 	||
			Utilities.isEmpty(info.address)	 	||
			Utilities.isEmpty(info.city) 		||
			Utilities.isEmpty(info.state) 		||
			Utilities.isEmpty(info.zipCode) 	||
			Utilities.isEmpty(info.phoneNumber) ||
			Utilities.isEmpty(info.password) 	||
			Utilities.isEmpty(info.email))
		{
			deferred.reject("All Values must be provided! ");
		} else {
			if(!Utilities.validateState(info.state)) {
				deferred.reject("Invalid state!");
			} else
			if(!Utilities.validateZipCode(info.zipCode)) {
				deferred.reject("Invalid zip code!");
			} else {
				deferred.resolve();
			}
		}
	}, function (error) {
		deferred.reject(error);
	});
	return deferred.promise;
}

/**
 *
 ssn
 Number
 Required
 Unique ID of the driver who drives the truck

 firstName
 String
 Required
 Driver’s first name

 lastName
 String
 Required
 Driver’s last name

 address
 String
 Required
 Address where the truckis located.

 city
 String
 Required
 City where the truck islocated.

 state
 String
 Required
 State where the truck is located.

 zipCode
 Number
 Required
 Zip Code of the location where the truck is located.

 phoneNumber
 tel
 Required
 Telephone number of the
 driver

 Email
 Required
 Email ID of the truck driver

 truckManufacturer
 String
 Optional
 Manufacturer of the truck

 truckModel
 String
 Optional
 Model of the truck
 * ***/