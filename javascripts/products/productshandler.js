/**
 * Created by Dell on 15-04-2016.
 */
var MongoDB = require("../commons/mongodbhandler");
var Utilities = require("../commons/utilities");
var PasswordManager = require("../authentication/passwordmanager");
var Q = require("q");
var UserTypes = require("../commons/constants").usertypes;
var Crypto = require("crypto");

/**
 * function to create product.
 * @param info
 * @returns {*|promise}
 */
exports.createproduct = function (info, user) {
    var productID = Crypto.createHash('sha1').update(info.productName + user.ssn).digest('hex');
    info.productID = productID;
    var deferred = Q.defer();
    if(UserTypes.FARMER == user.usertype){
    var isValid = _validateProductInfo(info);
    if(isValid){
       info = _sanitizeProductInfo(info, user);
        var cursor = MongoDB.collection("products").insert(info);
        cursor.then(function (user) {
            deferred.resolve(user);
        }).catch(function (error) {
            deferred.reject(error);
        });
    } else {
        deferred.reject("All values must be provided!");
    }
    } else {
        deferred.reject("Not a farmer!");
        return deferred.promise;
    }
    return deferred.promise;
};

/**
 * deletes a driver with given ssn from the system.
 * @param ssn
 * @returns {*|promise}
 */
exports.delete = function (productID) {
    //productID = Number(productID);

    var deferred = Q.defer();
    MongoDB.collection("products").remove({
        "productID": productID
    }, function (err, numberOfRemoved) {
        if(err) {
            deferred.reject(err);
        }
        if(numberOfRemoved.result.n) {
            deferred.resolve();
        } else {
            deferred.reject("Product with given ID not found in system!");
        }
    });
    return deferred.promise;
}
/**
 * * function to list all products.

* @returns {*|promise}
*/
exports.listallproducts = function () {

    var deferred = Q.defer();



        var productList=[];
        var cursor = MongoDB.collection("products").find();
    if(cursor != null) {
        cursor.each(function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else if (doc != null) {
                productList = productList.concat(doc);
            }
            else {
                deferred.resolve(productList);
            }
        });
    }
        else{
        deferred.reject("There are no Records for products");
    }
    return deferred.promise;
};
/**
 * * function to get a single product .

 * @returns {*|promise}
 */
exports.getproductinfo= function(productID){
    var deferred = Q.defer();
    var product= MongoDB.collection("products").findOne({"productID": productID},
        function(err,doc){
            if (err) {

            deferred.reject(err);
        }   if(doc != null){
                product= doc;
                console.log(product);
                deferred.resolve(product);
            }

            else{
                deferred.reject("There are no Records for product");
                //product=doc;


            }

        });
    return deferred.promise;
};
/**
 * * function to get a single product .

 * @returns {*|promise}
 */
exports.searchproduct= function(productName){
    var deferred = Q.defer();
  //  var productList=[];
    var product= MongoDB.collection("products").findOne({"productName": productName},
    function(err,doc) {

        if (err) {

            deferred.reject(err);
        }
        if (doc != null) {
            product = doc;
            console.log(product);
            deferred.resolve(product);
        }

        else {
            deferred.reject("There are no Records for product");

        }
    });

        return deferred.promise;
};
exports.updateproduct = function (info) {

    console.log(info);
    var deferred = Q.defer();
    var promise = _validateProductInfo(info);

    info1 = {};
    info1 = info;

    promise.done(function () {

        var cursor = MongoDB.collection("products").update({"productID": info.productID},
            {
                "productName": info.productName,
                "productPrice": info.productPrice,
                "description": info.description,
                "productImage": info.productImage
                });
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
 * function to sanitize the provided input.
 * @param info
 * @private
 */
_sanitizeProductInfo = function (info, user) {
    info.farmerFirstName = user.firstName;
    info.farmerLastName = user.lastName;
    info.farmerSSN = user.ssn;
    info.reviews = [];
    info.isApproved = false;
    delete info.ssn;
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

_validateProductInfo = function (info) {

   /* var promise = Utilities.validateEmail(info.email);*/


        if(
            Utilities.isEmpty(info.productName) 	||
            Utilities.isEmpty(info.productPrice) 	||
            Utilities.isEmpty(info.description) ) {
            return false;
        }
        return true;


}

