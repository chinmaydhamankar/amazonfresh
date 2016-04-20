/**
 * Created by pratiksanglikar on 19/04/16.
 */
var app = angular.module("amazonfresh");

app.controller("TrucksController", ["$scope","TruckService", function ($scope, TruckService) {
	$scope.signup = function () {
		var info = {
			"firstName": $scope.firstName,
			"lastName": $scope.lastName,
			"email": $scope.email,
			"password": $scope.credentials.password,
			"phone": $scope.phone,
			"ssn": $scope.ssn,
			"address": $scope.address,
			"state": $scope.state,
			"city": $scope.city,
			"zipCode": $scope.zipcode,
			"truckManufacturer": $scope.truckManufacturer,
			"truckModel": $scope.truckModel
		}
		var promise = TruckService.signup(info);
		promise.then(function (result) {
			alert("Success!");
		}, function (error) {
			alert("Error - " + error);
		});
	}
}]);