/**
 * Created by Abhay on 4/24/2016.
 */

var app = angular.module("amazonfresh");
app.controller('BillsController',["$scope","BillService",function ($scope, BillService) {
    $scope.generatebill = function () {
        var info = {
            "total_amount":10,
            "customer_id":10
        }
        var promise = BillService.generatebill(info);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.deletebill = function () {
        var info = {
            "firstName": "a"
        }
        var promise = BillService.deletebill(info);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.searchbill = function () {
        var info = {
            "firstName": "a"
        }
        var promise = BillService.searchbill(info);
        promise.then(function (result) {
            $scope.result = result.data.data;
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.getallbills = function () {
        var info = {
            "firstName": "a"
        }
        var promise = BillService.getallbills(info);
        promise.then(function (result) {
            $scope.result = result.data.data;
            calculateExpectedDeliveryDates();
        }, function (error) {
            alert("Error - " + error);
        });
    }

    calculateExpectedDeliveryDates = function ()
    {
        var currentDate = new Date();
        for(bill in $scope.result) {
            items = $scope.result[bill].item_details;
            for(var i=0;i<items.length;i++) {
                var item = items[i];
                if(item.expected_delivery_date > currentDate) {
                    //alert(item.expected_delivery_date)
                    item.expectedDeliveryDate =  formatDate(item.expected_delivery_date);
                } else {
                    item.expectedDeliveryDate = "Delivered!";
                }
            }
        }
    }

    formatDate = function (date1) {
        date1 = Number(date1);
        date = new Date(date1);
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var string = "";
        string += date.getUTCDate() + " " + months[date.getUTCMonth()] + ", " + date.getUTCFullYear();
        string += " - " + date.getUTCHours() + ":" + date.getUTCMinutes();
        return string;
    }

}]);

