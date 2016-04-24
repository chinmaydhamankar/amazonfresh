/**
 * Created by SHAILESH-PC on 4/24/2016.
 */

var MongoDB = require("../commons/mongodbhandler");
var Utilities = require("../commons/utilities");
var PasswordManager = require("../authentication/passwordmanager");
var Q = require("q");
var UserTypes = require("../commons/constants").usertypes;


exports.approvecreatefarmer = function (info) {
    console.log("come to approve");
    var deferred = Q.defer();
    var searchQuery = JSON.parse(info);
    console.log(searchQuery);
    var cursor = MongoDB.collection("users").update({"ssn" : searchQuery.ssn},searchQuery);
        cursor.then(function (user) {
            deferred.resolve(user);
        }).catch(function (error) {
            deferred.reject(error);
        });
    return deferred.promise;
};

