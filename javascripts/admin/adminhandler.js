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



exports.approveproduct = function (info) {
    var deferred = Q.defer();
    var searchQuery = JSON.parse(info);
    console.log(searchQuery);
    console.log(searchQuery.info.productName);
    var cursor = MongoDB.collection("products").update({"productName" : searchQuery.info.productName},{$set : { "isApproved" : true }});
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};


exports.approvecustomer = function (info) {
    var deferred = Q.defer();
    var searchQuery = JSON.parse(info);
    console.log(searchQuery);
    var cursor = MongoDB.collection("users").update({"ssn" : searchQuery.info.ssn},{$set : { "isApproved" : true }});
    cursor.then(function (user) {
        deferred.resolve(user);
    }).catch(function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};




exports.getAllUnApprovedFarmers = function() {
    console.log("here again why");
    var deferred = Q.defer();
    var cursor = MongoDB.collection("users").find({"usertype" : "FARMER", "isApproved": false });
    var farmerList = [];
    cursor.each(function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        if (doc != null) {
            farmerList.push(doc);
            console.log(farmerList);
        } else
        {
            deferred.resolve(farmerList);
        }
    })
    return deferred.promise;
};


exports.getAllUnApprovedProducts = function() {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("products").find({ "isApproved": false });
    var productList = [];
    cursor.each(function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        if (doc != null) {
            productList.push(doc);
            console.log(productList);
        } else
        {
            deferred.resolve(productList);
        }
    })
    return deferred.promise;
};

exports.getAllUnApprovedCustomers = function() {
    var deferred = Q.defer();
    var cursor = MongoDB.collection("users").find({"usertype" : "CUSTOMER", "isApproved": false});
    var customerList = [];
    cursor.each(function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        if (doc != null) {
            customerList.push(doc);
            console.log(customerList);
        } else
        {
            deferred.resolve(customerList);
        }
    })
    return deferred.promise;
};

