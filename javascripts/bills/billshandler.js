/**
 * Created by Abhay on 4/16/2016.
 */

var Q = require("q");
var TripHandler = require("../trips/tripshandler");
var Mysql = require("../commons/mysqlhandler");

exports.generatebill = function (info) {
    var deferred = Q.defer();
    var sqlQuery = "INSERT INTO bill (order_date, total_amount, customer_id) " +
                    "VALUES (sysdate(), " + info.total_amount + ", " + info.customer_id + ");";
    var insertInBillPromise = Mysql.executeQuery(sqlQuery);
    insertInBillPromise.done(function () {
        var getBillIdPromise = Mysql.executeQuery("SELECT max(bill_id) as max_bill_id from bill;");
        var billId;
        getBillIdPromise.done( function(rows){
            billId = rows[0].max_bill_id;
        });
        var getTripIdPromise = TripHandler.generateTrip("111-11-1222","111-11-8008","a3cd58f9c3495f7dd417af09f36f59687f342522");
        var tripId;
        var expectedDeliveryDate;
        getTripIdPromise.done( function(tripResult){
            tripId = tripResult.tripID;
            //expectedDeliveryDate = new Date(tripResult.deliveryTime).toISOString().slice(0, 19).replace('T', ' ');
            expectedDeliveryDate = tripResult.deliveryTime;
        });
        Q.all([getBillIdPromise, getTripIdPromise]).done(function () {
            sqlQuery =  "INSERT INTO item" +
                        " ( bill_id, product_id, quantity, price_per_unit, trip_id, expected_delivery_date ) " +
                        "VALUES (" + billId + ", 19, 19, 19,'" + tripId +"', '" + expectedDeliveryDate + "');";
            console.log(sqlQuery)
            var insertInItemPromise = Mysql.executeQuery(sqlQuery);
            insertInItemPromise.done( function(){
                deferred.resolve()
            }, function (error) {
                deferred.reject(error);
            });
        }, function (error) {
            deferred.reject(error);
        });
    }, function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};

exports.delete = function (billId) {
    var deferred = Q.defer();
    var promise = Mysql.executeQuery("DELETE FROM bill WHERE bill_id=" + billId + ";");
    promise.done( function(){
        deferred.resolve();
    },function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};

exports.searchbill = function (billId) {
    var deferred = Q.defer();
    var promise = _getOrder(billId);
    promise.done( function(order){
        deferred.resolve(order);
    }, function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};

exports.getallbills = function (customerId) {
    var deferred = Q.defer();
    var result = {};
    var getJoinPromise = Mysql.executeQuery("SELECT * FROM bill, item Where bill.customer_id = '" + customerId + "' AND bill.bill_id = item.bill_id;");
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
                "product_id" : joinResult[i].product_id,
                "quantity" : joinResult[i].quantity,
                "price_per_unit" : joinResult[i].price_per_unit,
                "trip_id" : joinResult[i].trip_id,
                "expected_delivery_date" : joinResult[i].expected_delivery_date
            });
        }
        deferred.resolve(result);
    }, function (error) {
        deferred.reject(error);
    });
    return deferred.promise;

};

function _getOrder(billId){
    var deferred = Q.defer();
    var getBillPromise = Mysql.executeQuery("SELECT * FROM bill WHERE bill_id=" + billId + ";");
    var billResult;
    getBillPromise.done(function(rows){
        billResult=rows;
    });
    var getItemPromise = Mysql.executeQuery("SELECT * FROM item WHERE bill_id=" + billId + ";");
    var itemResult;
    getItemPromise.done(function(rows){
        itemResult=rows;
    });
    Q.all([getBillPromise, getItemPromise]).done(function () {
        var result={"billResult":billResult,"itemResult":itemResult};
        deferred.resolve(result);
    }, function (error) {
        deferred.reject(error);
    });
    return deferred.promise;
};
