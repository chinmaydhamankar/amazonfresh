/**
 * Created by pratiksanglikar on 12/04/16.
 */
/*define(["angularAMD", "angular-route"], function (angularAMD) {
	var app = angular.module("amazonfresh", ["ngRoute"]);
	/!*app.config(function ($routeProvider) {
		/!*$routeProvider.when("/home", angularAMD.route({
			templateUrl: "views/home.html", controller: "MainControl",
			controllerUrl: "controllers/MainControl"
		}));*!/
	});*!/
	app.controller("MainControl",[ "$scope", function ($scope) {
		$scope.message = "Hello World!";
	}]);
	return angularAMD.bootstrap(app);
});*/

define(['angularAMD', 'angular-route'], function (angularAMD) {
	var app = angular.module("amazonfresh", ['ngRoute']);

	app.config(function ($routeProvider) {
		$routeProvider
			.when("/index", angularAMD.route({
				templateUrl: '/partials/view_home.html', controller: 'MainControl', controllerUrl: './controllers/MainControl'
			}))
			.otherwise({redirectTo: "/index"});
	});

	return angularAMD.bootstrap(app);
});