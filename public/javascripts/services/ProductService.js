/**
 * Created by pratiksanglikar on 24/04/16.
 */

angular.module("amazonfresh").factory("ProductService", ["$http","$q", function ($http, $q) {
	var ProductService = {
		createproduct: function (info) {
			var url = "http://localhost:3000/products";
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
		},
		listproducts: function(){
			var url = "http://localhost:3000/products";
			var def = $q.defer();
			$http({
				method: 'GET',
				url: url

			}).then(function (data) {
				if (data.data.success) {
					def.resolve(data.data.data);
				} else {
					def.reject(data.data.error);
				}
			}, function (error) {
				def.reject(error);
			});

			return def.promise;
		},
		deleteproduct: function(productID){
			var url = "http://localhost:3000/products/" + productID;
			var def = $q.defer();
			$http({
				method: 'DELETE',
				url: url

			}).then(function (data) {
				if (data.success) {
					def.resolve(data.data);
				} else {
					def.reject(data.error);
				}
			}, function (error) {
				def.reject(error);
			});

			return def.promise;
		}

		
	};
	return ProductService;
}]);