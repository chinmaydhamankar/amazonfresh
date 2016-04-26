/**
 * Created by Abhay on 4/24/2016.
 */

var app = angular.module("amazonfresh");
app.controller('BillsController',["$scope","BillService",function ($scope, BillService) {
    $scope.generatebill = function () {
        var info = {
            "firstName": "a"
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
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

}]);

