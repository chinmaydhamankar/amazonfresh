/**
 * Created by pratiksanglikar on 25/04/16.
 */
angular.module("amazonfresh").controller("TripsController",["$scope","$routeParams","TripsService",
	function ($scope,$routeParams, TripsService) {
		$scope.param = $routeParams.tripId;
		$scope.tripID = "01d03e5c2dd78e2477e332c0794ee442df3de202";

		init = function () {
			var promise = TripsService.getTripDetails($scope.tripID);
			promise.then(function (tripDetails) {
				$scope.tripDetails = tripDetails;
				calculateDeliveryStatus(tripDetails);
			}).catch(function (error) {
				alert("Error: " + error);
			});
		}

		calculateDeliveryStatus = function (tripDetails) {
			$scope.orderDateString = calculateDateString(tripDetails.orderTime);
			$scope.expectedDeliveryDateString = calculateDateString(tripDetails.deliveryTime);
			$scope.deliveryStatus = getDeliveryStatus(tripDetails.deliveryTime);
		}

		calculateDateString = function (date) {
			var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var string = "";
			if(isNaN(date)) {
				date = Number(date);
			}
			date = new Date(date);
			string += date.getUTCDate() + " " + months[date.getUTCMonth()] + ", " + date.getUTCFullYear() + " ";
			string += date.getUTCHours() + ":" + date.getUTCMinutes();
			return string;
		}

		getDeliveryStatus = function (date) {
			if(isNaN(date)) {
				date = Number(date);
			}
			if(date >= new Date().getTime()) {
				return "In Transit";
			} else {
				return "Delivered!";
			}
		}

		init();
	}
]);