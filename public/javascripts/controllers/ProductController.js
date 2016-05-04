/**
 * Created by pratiksanglikar on 24/04/16.
 */
/**
 * Created by Dell on 20-04-2016.
 */
var app = angular.module("amazonfresh");


angular.module("amazonfresh").controller("ProductController", ["$scope", "$window", "ProductService","ValidationService",
	function ($scope, $window, ProductService, ValidationService) {

		$scope.notf1Options = {
			templates: [{
				type: "ngTemplate",
				template: $("#notificationTemplate").html()
			}]
		};
	$scope.createproduct = function () {

		var info = {
			"productName": $scope.productName,
			"productPrice": $scope.productPrice,
			"description": $scope.description,
			"productImage": $scope.productImage

		}
		var errors = _getErrors(info);
		if(errors.length > 0 ){
			for(var i = 0 ; i < errors.length ; i++) {
				$scope.errorNotification.show({
					kValue: errors[i]
				},"ngTemplate");
			}
		} else {

			var promise = ProductService.createproduct(info);
			promise.then(function (result) {
				//alert("Success!");
			}, function (error) {
				alert("Error - " + error);
			});
		}
	};

	extractCartItems = function () {
		$scope.cartList = [];
		for (var i = 0 ; i < $scope.cart.length ; i++) {
			for(var j = 0; j < $scope.productList.length ; j++ ) {
				if($scope.productList[j].productID === $scope.cart[i].productID) {
					$scope.productList[j].quantity = $scope.cart[i].quantity;
					$scope.cartList.push($scope.productList[j]);
				}
			}
		}
	}

	$scope.deleteproduct = function (productID) {
		var promise = ProductService.deleteproduct(productID);
		promise.then(function (result) {
			//alert("Success!");
		}, function (error) {
			alert("Error" + error);
		});
	}
		_getErrors = function (info) {
			var errors = [];
			if(ValidationService.isEmpty(info.productName)) {
				errors.push("Productt Name can not be empty!");
			}
			if(ValidationService.isEmpty(info.productPrice)) {
				errors.push("Product Price can not be empty!");
			}if(ValidationService.isEmpty(info.description)) {
				errors.push("Product Description can not be empty!");
			}
			return errors;
		}
	$scope.updateCart = function (productID, quantity) {
		var promise = ProductService.updateCart(productID, quantity);
		promise.then(function (cart) {
			$scope.cart = cart;
			extractCartItems();
		}).catch(function (error) {
			alert("Sorry! something went wrong!");
		});
	}

	$scope.addToCart = function (product) {
		for(var i = 0 ; i < $scope.cartList.length ; i++) {
			if($scope.cartList[i].productID === product.productID) {
				$scope.updateCart(product.productID, ($scope.cartList[i].quantity + 1));
				return;
			}
		}
		var promise = ProductService.addToCart(product.productID);
		promise.then(function (cart) {
			$scope.cart = cart;
			extractCartItems();
		}).catch(function (error) {
			alert("Ooops! I'm so embarrassed that I can't complete your request! " + error);
		});
	}

	$scope.checkout = function () {
		var promise = ProductService.checkout($scope.cartList);
		promise.then(function (result) {
			$window.location.href = "http://localhost:3000/#bills/orders";
		}).catch(function (error) {
			alert("Oops! Something went wrong! " + error);
		});
	}


		$scope.searchProduct = function()
		{
			//alert($scope.searchText);
			if($scope.searchText == undefined || $scope.searchText == "")
			{
				init();
			}
			else
			{
				var info =
				{
					productName : $scope.searchText
				}
				var promise = ProductService.searchProduct(info);
				promise.then(function (result){
					$scope.productList = result;
					$scope.source = new kendo.data.DataSource({
						data: result,
						pageSize: 21
					});
				});
			}

		}


	init = function () {
		$scope.cart = [];
		var promise = ProductService.listproducts();
		promise.then(function (data) {
			$scope.productList = data;
			$scope.source = new kendo.data.DataSource({
				data: data,
				pageSize: 21
			});
			var cartPromise = ProductService.getCart();
			cartPromise.then(function (cart) {
				$scope.cart = cart;
				extractCartItems();
			}).catch(function (error) {
				alert("Ooops! something went terribly wrong! " + error);
			});
		}).catch(function (error) {
			if(error.status === 403) {
				$window.location.href = "/";
			} else {
				alert("Ooops! Something went terribly wrong! No Cheesecake for you today! :P");
			}
		});
	}
	init();
}]);