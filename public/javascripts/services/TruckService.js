/**
 * Created by pratiksanglikar on 19/04/16.
 */
angular.module("amazonfresh").factory("TruckService",["$window","$http","$q", function ($window, $http, $q) {
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
					alert("errorororor");
					alert(data.data.error);
					def.reject(data.data.error);
				}
			}, function (error) {
				if(error.status=== 403 || error.status === 302) {
					$window.location.href = "http://localhost:3000/#/auth/login";
				}
				else
				{
					alert("Hii");
					def.reject(error.data.error);
				}

			});
			return def.promise;
		}
	};
	return TruckService;
}]);