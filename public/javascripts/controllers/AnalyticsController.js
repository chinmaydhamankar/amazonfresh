/**
 * Created by pratiksanglikar on 27/04/16.
 */
var app = angular.module("amazonfresh");

app.controller("AnalyticsController",["$scope","$window","$q","AnalyticsService",
	function ($scope, $window, $q, AnalyticsService) {
		var promise = AnalyticsService.getRevenueByDay();
		promise.then(function (result) {
			$scope.analyticsData = result.data.data;
		}).catch(function (error) {
			if(error.status === 302) {
				$window.location.href = "http://localhost:3000/auth/login";
			}
			alert("Oops! Something went terribly wrong! ");
		});
	}]);