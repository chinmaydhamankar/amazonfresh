/**
 * Created by SHAILESH-PC on 4/14/2016.
 */

var MongoDB = require("../commons/mongodbhandler");
var Utilities = require("../commons/utilities");
var PasswordManager = require("../authentication/passwordmanager");
var Q = require("q");
var UserTypes = require("../commons/constants").usertypes;


exports.createfarmer = function (info) {
    var deferred = Q.defer();
    var promise = _validateInfo(info);
    promise.done(function () {
        info = _sanitizeInfo(info);
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

exports.delete = function (ssn) {
   console.log("came here");
    console.log(ssn);
    //ssn = Number(ssn);
    //console.log(ssn);
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
            deferred.reject("Farmer with given SSN not found in system!");
        }
    });
    return deferred.promise;
}



_sanitizeInfo = function (info) {
    info.password = PasswordManager.encryptPassword(info.password);
    info.usertype = UserTypes.FARMER;
    info.rating = 0;
    info.reviews = [];
    return info;
}


_validateInfo = function (info) {
    var deferred = Q.defer();
    var promise = Utilities.validateEmail(info.email);
    var promise1 = Utilities.validateSSN(info.ssn);
   Q.all([promise, promise1]).done(function () {
    //promise.done(function () {
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
            deferred.reject("All values must be provided! ");
        } else {
            if(!Utilities.validateState(info.state)) {
                console.log("inavlaid sate");
                deferred.reject("Invalid state!");
            } else
            if(!Utilities.validateZipCode(info.zipCode)) {
                console.log("inavlaid zip codd");
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