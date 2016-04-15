/**
 * Created by pratiksanglikar on 12/04/16.
 */

var app = angular.module("amazonfresh", ["ngRoute","kendo.directives"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when("/index", {
		templateUrl: "partials/login.html",
		controller: "AuthController"
	}).when("/customers/signup", {
		templateUrl: "partials/customers/signup.html",
		controller: "CustomersController"

	}).otherwise({
		redirectTo: "/index"
	});

	$locationProvider.html5Mode(true);
});

app.controller("MyCtrl", function($scope){
});