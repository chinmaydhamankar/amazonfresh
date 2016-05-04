/**
 * Created by Abhay on 4/16/2016.
 */

var Q = require("q");
var Mysql = require("../commons/mysqlhandler");

/**
 * searches all bills with given customer id.
 */
exports.getallbills = function (customerId) {
    var deferred = Q.defer();
    var result = {};
    var getJoinPromise = Mysql.executeQuery("SELECT * FROM bill, item Where bill.customer_id = '" + customerId + "' AND bill.bill_id = item.bill_id LIMIT 1000;");
    getJoinPromise.done(function(joinResult){
        for(var i=0 ; i < joinResult.length ; i++){
            if(!result[joinResult[i].bill_id]) {
                result[joinResult[i].bill_id] = {};
                result[joinResult[i].bill_id].bill_id = joinResult[i].bill_id;
                result[joinResult[i].bill_id].order_date = joinResult[i].order_date;
                result[joinResult[i].bill_id].total_amount = joinResult[i].total_amount;
                result[joinResult[i].bill_id].item_details = [];
            }
            result[joinResult[i].bill_id].item_details.push({
                "trip_id" : joinResult[i].trip_id,
                "product_id" : joinResult[i].product_id,
                "quantity" : joinResult[i].quantity,
                "price_per_unit" : joinResult[i].price_per_unit,
                // "trip_id" : joinResult[i].trip_id,
                "expected_delivery_date" : joinResult[i].expected_delivery_date,
                "product_name" : joinResult[i].product_name,
                "product_image_url" : joinResult[i].product_image_url
            });
        }
        deferred.resolve(result);
    }, function (error) {
        deferred.reject(error);
    });
    return deferred.promise;

};

exports.getallbillsadmin = function () {
    var deferred = Q.defer();
    var result = {};
    var getJoinPromise = Mysql.executeQuery("SELECT * FROM bill, item Where bill.bill_id = item.bill_id LIMIT 1000;");
    getJoinPromise.done(function(joinResult) {
        for(var i=0 ; i < joinResult.length ; i++){
            if(!result[joinResult[i].bill_id]) {
                result[joinResult[i].bill_id] = {};
                result[joinResult[i].bill_id].bill_id = joinResult[i].bill_id;
                result[joinResult[i].bill_id].order_date = joinResult[i].order_date;
                result[joinResult[i].bill_id].total_amount = joinResult[i].total_amount;
                result[joinResult[i].bill_id].customer_id = joinResult[i].customer_id;
                result[joinResult[i].bill_id].item_details = [];
            }
            result[joinResult[i].bill_id].item_details.push({
                "trip_id" : joinResult[i].trip_id,
                "product_id" : joinResult[i].product_id,
                "quantity" : joinResult[i].quantity,
                "price_per_unit" : joinResult[i].price_per_unit,
                "expected_delivery_date" : joinResult[i].expected_delivery_date,
                "product_name" : joinResult[i].product_name,
                "product_image_url" : joinResult[i].product_image_url
            });
        }
        deferred.resolve(result);
    }, function (error) {
        deferred.reject(error);
    });
    return deferred.promise;

};