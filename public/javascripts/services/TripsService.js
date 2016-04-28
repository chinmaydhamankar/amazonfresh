/**
 * Created by pratiksanglikar on 25/04/16.
 */
angular.module("amazonfresh").factory("TripsService",["$window","$http", "$q", function ($window, $http, $q) {
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

				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				deferred.reject(error.data.error);
			});
			return deferred.promise;
		}
	};
	return TripsService;
}]);