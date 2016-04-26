/**
 * Created by Abhay on 4/24/2016.
 */

var app = angular.module("amazonfresh");
app.controller('BillsController',["$scope","$window","BillService",function ($scope, $window, BillService) {
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

    $scope.deletebill = function (billId) {
        var promise = BillService.deletebill(billId);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.searchbill = function (billId) {
        var promise = BillService.searchbill(billId);
        promise.then(function (result) {
            $scope.result = result.data.data;
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.getallbills = function (customerId) {
        var promise = BillService.getallbills(customerId);
        promise.then(function (result) {
            $scope.result = result.data.data;
            calculateExpectedDeliveryDates();
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.revenue = function (){
        var promise = BillService.revenue();
        promise.then(function (result) {
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.trackPackage = function(tripId){
        var url = "/#trips/track/" + tripId;
        $window.location.href = url;
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

