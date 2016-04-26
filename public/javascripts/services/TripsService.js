/**
 * Created by pratiksanglikar on 25/04/16.
 */
angular.module("amazonfresh").factory("TripsService",["$http", "$q", function ($http, $q) {
	var TripsService = {
		getTripDetails: function (tripID) {
			var deferred = $q.defer();
			var url = "http://localhost:3000/trips/id/" + tripID;
			$http({
				url: url,
				method: "GET"
			}).then(function (data) {
				if(data.data.success) {
					deferred.resolve(data.data.data);
				} else {
					deferred.reject(data.data.error);
				}
			}).catch(function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	};
	return TripsService;
}]);