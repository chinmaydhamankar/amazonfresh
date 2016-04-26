/**
 * Created by pratiksanglikar on 25/04/16.
 */
angular.module("amazonfresh").controller("TripsController",["$scope","$routeParams","TripsService",
	function ($scope,$routeParams, TripsService) {
		$scope.param = $routeParams.tripId;
		$scope.tripID = "01d03e5c2dd78e2477e332c0794ee442df3de202";
}]);
