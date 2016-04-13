/**
 * Created by pratiksanglikar on 12/04/16.
 */
define(['angularAMD', 'angular-route'], function (angularAMD) {
	var app = angular.module("amazonfresh", ['ngRoute']);

	app.config(function ($routeProvider) {
		$routeProvider
			.when("/index", angularAMD.route({
				templateUrl: '/partials/login.html', controller: 'MainControl', controllerUrl: './controllers/MainControl'
			}))
			.otherwise({redirectTo: "/index"});
	});

	return angularAMD.bootstrap(app);
});