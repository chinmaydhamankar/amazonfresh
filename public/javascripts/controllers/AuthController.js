/**
 * Created by pratiksanglikar on 12/04/16.
 */
var app = angular.module("amazonfresh");

app.controller('AuthController', ["$scope", function ($scope) {
	$scope.login = function () {
		alert("hi");
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
