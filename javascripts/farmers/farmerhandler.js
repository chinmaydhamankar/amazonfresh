    /**
 * Created by SHAILESH-PC on 4/14/2016.
 */

var MongoDB = require("../commons/mongodbhandler");
var Utilities = require("../commons/utilities");
var PasswordManager = require("../authentication/passwordmanager");
var Q = require("q");
var UserTypes = require("../commons/constants").usertypes;


exports.createfarmer = function (info) {
    console.log("from here flow");
    var deferred = Q.defer();
    var promise = _validateFarmerInfo(info);
    console.log("to here");
    console.log(info);
    promise.done(function () {
        info = _sanitizeFarmerInfo(info);
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
    console.log("ssn is " + ssn);
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

    exports.getAllFarmers = function()
    {
       var deferred = Q.defer();
        var cursor = MongoDB.collection("users").find({"usertype" : "FARMER"});
        var farmerList = [];
        cursor.each(function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            if (doc != null) {
                farmerList.push(doc);
                console.log(farmerList);
            } else {
                deferred.resolve(farmerList);
            }
        });

        return deferred.promise;

    };


    exports.getFarmerInfo = function(ssn)
    {
        var deferred = Q.defer();
        var cursor = MongoDB.collection("users").find({"ssn": ssn});
        var farmerList = {};
        cursor.each(function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            if (doc != null) {
                farmerList = doc;
            } else {
                console.log("farmer list from here");
                console.log(farmerList);
                deferred.resolve(farmerList);
            }
        });
        return deferred.promise;

    };





    exports.updateFarmer = function (info) {
        console.log("from here flowingss");
        console.log(info);
        var deferred = Q.defer();
        var promise = _validateFarmerInfo(info);
        console.log("to here");
        info1 = {};
        info1 = info;
        console.log(info);
        promise.done(function () {
            info = _sanitizeFarmerInfo(info);
            var cursor = MongoDB.collection("users").update({"ssn": info.ssn,"usertype" : "FARMER"},{"city": info.city});
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


_sanitizeFarmerInfo = function (info) {
    info.password = PasswordManager.encryptPassword(info.password);
    info.usertype = UserTypes.FARMER;
    info.rating = 0;
    info.reviews = [];
    return info;
}


_validateFarmerInfo = function (info) {
    var deferred = Q.defer();
    var promise = Utilities.validateEmail(info.email);
   // var promise1 = Utilities.validateSSN(info.ssn);
  // Q.all([promise, promise1]).done(function () {
    promise.done(function () {
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
            console.log("error from here");
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