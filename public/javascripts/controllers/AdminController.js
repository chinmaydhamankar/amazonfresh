/**
 * Created by Chinmay on 21-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('AdminController',["$scope","AdminService",function ($scope,AdminService) {
	function init()
	{
		$scope.getPendingCustomers();
		$scope.getPendingFarmers();
		$scope.getPendingProducts();
	}

    $scope.options = {
        tabPosition: "left"
    }

	$scope.onAdvancedSearchWindowOpen = function () {
		$scope.typeSelectionList.select(0);
		$scope.type = "Farmers";
	}
	$scope.getPendingFarmers = function () {
		var promise = AdminService.signup();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$scope.farmlength = result.data.data.length;

		}, function (error) {
			alert("Error - " + error);
		});
	};


	$scope.declineReq = function (ssn,productName,usertype) {
		var promise = AdminService.declineReq(ssn,productName);
		promise.then(function (result) {
			//$scope.data = result.data;
			alert("URL here is " + result);
			if (result == "f") {
				if (usertype == "FARMER") {
					$scope.getPendingFarmers();
				}
				else
				{
					$scope.getPendingCustomers();
				}
			}
			else
			{
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error);
		});
	};


	$scope.approveReq = function (ssn,productName,usertype) {
		var promise = AdminService.approveReq(ssn,productName);
		promise.then(function (result) {
			//$scope.data = result.data;
			alert("URL here is " + result);
			if (result == "f") {
				if (usertype == "FARMER") {
					$scope.getPendingFarmers();
				}
				else
				{
					$scope.getPendingCustomers();
				}
			}
			else
			{
				alert("In products");
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error);
		});
	};


	$scope.getPendingCustomers = function () {
		var promise = AdminService.getPendingCustomers();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$scope.custlength = result.data.data.length;

		}, function (error) {
			alert("Error - " + error);
		});
	};

	$scope.getPendingProducts = function () {
		var promise = AdminService.getPendingProducts();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 1;
			$scope.prodlength = result.data.data.length;

		}, function (error) {
			alert("Error - " + error);
		});
	};

	$scope.advancedSearchWindowOptions = {
		title: "Advanced Search",
		visible: false,
		modal: true,
		width: "660",
		height: "400"
	}
	init();
}]);