/**
 * Created by pratiksanglikar on 12/04/16.
 */
var app = angular.module("amazonfresh");

app.controller('AuthController', ["$scope","$window","AuthService", function ($scope, $window, AuthService) {
	$scope.login = function () {
		var promise = AuthService.login($scope.email, $scope.password);
		promise.then(function () {
			alert("successful!");
		}, function () {
			alert("Invalid!");
		});
	};
	
	$scope.redirectToFarmerSignUp = function () {
		$window.location.href = "/#farmers/signup";
	}
	
	$scope.redirectToDriverSignUp = function () {
		$window.location.href = "/#trucks/signup";
	}
}]);
