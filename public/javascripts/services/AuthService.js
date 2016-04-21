/**
 * Created by pratiksanglikar on 13/04/16.
 */
angular.module("amazonfresh").factory("AuthService",["$http","$q", function ($http, $q) {
	var AuthService = {
		login: function (email, password) {
			var url = "http://localhost:3000/auth/login";
			var def = $q.defer();
			$http({
				method: "POST",
				url: url,
				data: {
					email: email,
					password: password
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
	return AuthService;
}]);