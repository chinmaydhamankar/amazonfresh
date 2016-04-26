/**
 * Created by pratiksanglikar on 24/04/16.
 */
/**
 * Created by Dell on 20-04-2016.
 */
var app = angular.module("amazonfresh");


angular.module("amazonfresh").controller("ProductController",["$scope","ProductService", function ($scope, ProductService) {
	init = function () {
		ProductService.getList();
	}
	init();
	$scope.createproduct = function () {
		var info = {
			"productID": $scope.productID,
			"ssn": $scope.ssn,
			"productName": $scope.productName,
			"productPrice": $scope.productPrice,
			"description": $scope.description,

		}
		var promise = ProductService.createproduct(info);
		promise.then(function (result) {
			alert("Success!");
		}, function (error) {
			alert("Error - " + error);
		});
	}

	init = function(){
		var promise=ProductService.listproducts();
		promise.then(function(data){
			$scope.source = new kendo.data.DataSource({
				data: data,
				pageSize: 21
			});
		}).catch (function (error) {
			alert("Ooops! Something went terribly wrong! No Cheesecake for you today! :P");
		});
	}
	init();


}]);