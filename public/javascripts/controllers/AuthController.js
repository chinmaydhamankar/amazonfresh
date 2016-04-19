/**
 * Created by pratiksanglikar on 12/04/16.
 */
var app = angular.module("amazonfresh");

app.controller('AuthController', ["$scope","AuthService", function ($scope, AuthService) {
	$scope.login = function () {
		var promise = AuthService.login($scope.email, $scope.password);
		promise.then(function () {
			alert("successful!");
		}, function () {
			alert("Invalid!");
		});
	};
}]);

/*
define(['angularAMD',"../services/AuthService"], function (app) {
	app.register.controller('AuthController', ["$scope", "AuthService", function ($scope, AuthService) {
		$scope.login = function () {
			AuthService.login();
		}
	}]);
});*/
