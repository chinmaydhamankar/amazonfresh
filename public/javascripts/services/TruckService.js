/**
 * Created by pratiksanglikar on 19/04/16.
 */
angular.module("amazonfresh").factory("TruckService",["$http","$q", function ($http, $q) {
	var TruckService = {
		signup: function (info) {
			var url = "http://localhost:3000/trucks";
			var def = $q.defer();
			$http({
				method: 'POST',
				url: url,
				data: {
					"info": info
				}
			}).then(function (data) {
				if (data.data.success) {
					def.resolve();
				} else {
					def.reject(data.data.error);
				}
			}, function (error) {
				def.reject(error);
			});
			return def.promise;
		}
	};
	return TruckService;
}]);