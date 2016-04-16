/**
 * Created by Chinmay on 16-04-2016.
 */

var MongoDB = require("../commons/mongodbhandler");
var Utilities = require("../commons/utilities");
var PasswordManager = require("../authentication/passwordmanager");
var Q = require("q");
var UserTypes = require("../commons/constants").usertypes;

exports.signup = function(info)
{
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
    },function (error) {
        deferred.reject(error);
    });
    return deferred.promise;

};



_validateInfo = function (info) {
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
            Utilities.isEmpty(info.password1) 	||
            Utilities.isEmpty(info.password2) 	||
            Utilities.isEmpty(info.email))
        {
            deferred.reject("All values must be provided! ");
        } else {
            if(!Utilities.validateState(info.state)) {
                deferred.reject("Invalid state!");
            } else
            if(!Utilities.validateZipCode(info.zipCode)) {
                deferred.reject("Invalid zip code!");
            }else
            if(!Utilities.verifyPassword(info.password1,info.password2)){
                deferred.reject("Invalid Password!");
            }
            else {
                deferred.resolve();
            }
        }
    }, function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
}

_sanitizeInfo = function (info) {
    info.password = PasswordManager.encryptPassword(info.password);
    info.usertype = UserTypes.CUSTOMER;
    return info;
}