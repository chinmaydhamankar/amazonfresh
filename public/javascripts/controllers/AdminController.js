/**
 * Created by Chinmay on 21-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('AdminController',["$scope","AdminService",function ($scope,AdminService) {
    $scope.options = {
        tabPosition: "left"
    }

	$scope.getPendingFarmers = function () {
		var promise = AdminService.signup();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error);
		});
	};

	$scope.getPendingCustomers = function () {
		var promise = AdminService.getPendingCustomers();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error);
		});
	};

	$scope.getPendingProducts = function () {
		var promise = AdminService.getPendingProducts();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 1;

		}, function (error) {
			alert("Error - " + error);
		});
	};

	$scope.advancedSearchWindowOptions = {
		title: "Advanced Search",
		visible: false,
		modal: true,
		width: "800",
		height: "300"
	}
}]);