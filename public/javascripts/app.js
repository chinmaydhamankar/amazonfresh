/**
 * Created by pratiksanglikar on 12/04/16.
 */
define(['angularAMD', 'angular-route'], function (angularAMD) {
	var app = angular.module("amazonfresh", ['ngRoute']);

	app.config(function ($routeProvider) {
		$routeProvider
			.when("/index", angularAMD.route({
				templateUrl: '/partials/login.html', controller: 'AuthController', controllerUrl: './controllers/AuthController'
			}))
			.when("/customers/signup", angularAMD.route({
				templateUrl: '/partials/signup.html', controller: 'CustomersController', controllerUrl: './controllers/customersController'
			}))
			.otherwise({redirectTo: "/index"});
	});
	return angularAMD.bootstrap(app);
});