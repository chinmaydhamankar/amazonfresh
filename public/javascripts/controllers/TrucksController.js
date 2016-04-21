/**
 * Created by pratiksanglikar on 19/04/16.
 */
var app = angular.module("amazonfresh");

app.controller("TrucksController", ["$scope","TruckService", "US_STATES",function ($scope, TruckService, US_STATES) {

	$scope.credentials = {};
	$scope.USStatesOptions = {
		dataSource: US_STATES,
		dataTextField: "name",
		dataValueField: "abbreviation"
	};

	$scope.nextTab = function () {
		$scope.trucksTabStrip.select(1);
	};

	$scope.notf1Options = {
		templates: [{
			type: "ngTemplate",
			template: $("#notificationTemplate").html()
		}]
	};

	$scope.signup = function () {

		if($scope.credentials.password !== $scope.verifyPassword){
			$scope.errorNotification.show({
				kValue: "Password do not match!"
			},"ngTemplate");
		}

		var info = {
			"firstName": $scope.firstName,
			"lastName": $scope.lastName,
			"email": $scope.email,
			"password": $scope.credentials.password,
			"phoneNumber": $scope.phone,
			"ssn": $scope.ssn,
			"address": $scope.address,
			"state": $scope.state,
			"city": $scope.city,
			"zipCode": $scope.zipcode,
			"truckManufacturer": $scope.truckManufacturer,
			"truckModel": $scope.truckModel
		}
		var errors = _getErrors(info);
		if(errors.length > 0 ){
			for(var i = 0 ; i < errors.length ; i++) {
				$scope.errorNotification.show({
					kValue: errors[i]
				},"ngTemplate");
			}
		} else {
			var promise = TruckService.signup(info);
			promise.then(function (result) {
				alert("Success!");
			}, function (error) {
				alert("Error - " + error);
			});
		}
	};

	_getErrors = function (info) {
		var errors = [];
		if(!info.firstName) {
			errors.push("First Name can not be empty!");
		}
		if(!info.lastName) {
			errors.push("Last Name can not be empty!");
		}if(!info.email) {
			errors.push("Email can not be empty!");
		}if(!info.password) {
			errors.push("Password can not be empty!");
		}if(!info.phoneNumber) {
			errors.push("Phone Number can not be empty!");
		}if(!info.ssn) {
			errors.push("SSN can not be empty!");
		}if(!info.address) {
			errors.push("Address can not be empty!");
		}if(!info.state) {
			errors.push("State can not be empty!");
		}if(!info.city) {
			errors.push("City can not be empty!");
		}if(!info.zipCode) {
			errors.push("Zip Code can not be empty!");
		}
		return errors;
	}
}]);