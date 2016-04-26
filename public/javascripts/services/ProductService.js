/**
 * Created by pratiksanglikar on 24/04/16.
 */

angular.module("amazonfresh").factory("ProductService", ["$http", "$q", function ($http, $q) {
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
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				def.reject(error);
			});
			return def.promise;
		},
		listproducts: function () {
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
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				def.reject(error);
			});

			return def.promise;
		},
		deleteproduct: function (productID) {
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
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				def.reject(error);
			});

			return def.promise;
		},

		addToCart: function (productId) {
			var deferred = $q.defer();
			$http({
				url: "http://localhost:3000/products/cart",
				method: "POST",
				data: {
					productID: productId
				}
			}).then(function (result) {
				deferred.resolve(result.data.data);
			}).catch(function (error) {
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				deferred.reject(error);
			})
			return deferred.promise;
		},

		updateCart: function (productId, quantity) {
			var deferred = $q.defer();
			$http({
				url: "http://localhost:3000/products/cart",
				method: "PUT",
				data: {
					productID: productId,
					quantity: quantity
				}
			}).then(function (result) {
				deferred.resolve(result.data.data);
			}).catch(function (error) {
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				deferred.reject(error);
			});
			return deferred.promise;
		},

		deleteFromCart: function (productId) {
			var deferred = $q.defer();
			$http({
				url: "http://localhost:3000/products/cart/" + productId,
				method: "DELETE"
			}).then(function () {
				deferred.resolve();
			}).catch(function (error) {
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				deferred.reject(error);
			});
			return deferred.promise;
		},

		checkout: function (cartList) {
			var deferred = $q.defer();
			var totalAmount = 0;
			var products = [];
			for (var i = 0; i < cartList.length; i++) {
				totalAmount += (cartList[i].quantity * cartList[i].productPrice);
				products.push({
					"product_id": cartList[i].productID,
					"quantity": cartList[i].quantity,
					"price_per_unit": cartList[i].productPrice,
					"farmer_id": cartList[i].farmerSSN
				});
			}

			var info = {
				"total_amount": totalAmount,
				"product_details": products
			};

			$http({
				url: "http://localhost:3000/bills/generatebill",
				method: "POST",
				data: {
					"info": info
				}
			}).then(function (result) {
				deferred.resolve(result);
			}).catch(function (error) {
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				deferred.reject(error);
			});
			return deferred.promise;
		},

		getCart: function () {
			var deferred = $q.defer();
			$http({
				url: "http://localhost:3000/products/cart",
				method: "GET"
			}).then(function (data) {
				if (data.data.success) {
					deferred.resolve(data.data.data);
				} else {
					deferred.reject(data.data.error);
				}
			}).catch(function (error) {
				if(error.status=== 302)
				{
					$window.location.href="http://localhost:3000/#auth/login";
				}
				deferred.reject(error);
			});
			return deferred.promise;
		}
	};
	return ProductService;
}]);