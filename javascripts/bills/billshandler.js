/**
 * Created by Abhay on 4/16/2016.
 */

var Q = require("q");
var Mysql = require("../commons/mysqlhandler");

exports.generatebill = function (info) {
    var deferred = Q.defer();
    var sqlQuery = "INSERT INTO bill " +
                    "(date, expected_delivery_time, total_amount, item_amount, shipping_amount, trip_id, customer_id)" +
                    " VALUES (sysdate(), DATE_ADD(sysdate(),INTERVAL 3 DAY) , 17, 17, 17, 17, 17);";
    var insertInBillPromise = Mysql.executeQuery(sqlQuery);
    insertInBillPromise.done(function () {
        var getBillIdPromise = Mysql.executeQuery("SELECT max(bill_id) as max_bill_id from bill;");
        getBillIdPromise.done(function (rows) {
            var billId = rows[0].max_bill_id;
            sqlQuery =  "INSERT INTO item" +
                        " ( bill_id, product_id, quantity, price_per_unit,customer_id) " +
                        "VALUES (" + billId + ", '17', '17', '17',17);"
            Mysql.executeQuery(sqlQuery);
        }, function (error) {
            insertInBillPromise.reject(error);
        });
        deferred.resolve();
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
                //"item_id" : joinResult[i].item_id,
                "product_id" : joinResult[i].product_id,
                "quantity" : joinResult[i].quantity,
                "price_per_unit" : joinResult[i].price_per_unit,
                "trip_id" : joinResult[i].trip_id,
                "delivery_date" : joinResult[i].delivery_date
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
