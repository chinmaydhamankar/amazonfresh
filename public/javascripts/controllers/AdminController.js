/**
 * Created by Chinmay on 21-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('AdminController',["$scope", "$window", "$rootScope", "AdminService",function ($scope, $window, $rootScope, AdminService) {
	$scope.Customers = true;
	$scope.Farmers = true;
	$scope.Products = true;

	$scope.$watch('type', function( val ) {
		if( val === 'Customers' ) {
			$scope.Customers = false;
			$scope.Farmers = true;
			$scope.Products = true;
		} else if(val == 'Farmers'){
			$scope.Farmers = false;
			$scope.Customers = true;
			$scope.Products = true;
		}
		else if(val == 'Products'){
			$scope.Products = false;
			$scope.Farmers = true;
			$scope.Customers = true;
		}
	});

	function init()
	{
		if(!$rootScope.variable)
		{
			$scope.getPendingCustomers();
			$scope.getPendingFarmers();
			$scope.getPendingProducts();
			$rootScope.variable = 1;
		}
	}

	$scope.goToHome = function(){
		$window.location.href = "/#admin/home";
	}

    $scope.options = {
        tabPosition: "left"
    }

	$scope.onAdvancedSearchWindowOpen = function () {
		$scope.typeSelectionList.select(0);
		$scope.type = "Farmers";
	}
	$scope.getPendingFarmers = function () {
		var promise = AdminService.signup();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$rootScope.farmlength = result.data.data.length;
			$rootScope.variable = 1;
			/*$window.location.href = "/#admin/home";*/

		}, function (error) {
			alert("Error - " + error);
		});
	};


	$scope.declineReq = function (ssn,productName,usertype) {
		var promise = AdminService.declineReq(ssn,productName);
		promise.then(function (result) {
			if (result == "f") {
				if (usertype == "FARMER") {
					$scope.getPendingFarmers();
				}
				else
				{
					$scope.getPendingCustomers();
				}
			}
			else
			{
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error);
		});
	};


	$scope.approveReq = function (ssn,productName,usertype) {
		var promise = AdminService.approveReq(ssn,productName);
		promise.then(function (result) {
			if (result == "f") {
				if (usertype == "FARMER") {
					$scope.getPendingFarmers();
				}
				else
				{
					$scope.getPendingCustomers();
				}
			}
			else
			{
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error);
		});
	};


	$scope.getPendingCustomers = function () {
		var promise = AdminService.getPendingCustomers();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$rootScope.custlength = result.data.data.length;
			$rootScope.variable = 2;
			/*$window.location.href = "/#admin/home";*/

		}, function (error) {
			alert("Error - " + error);
		});
	};

	$scope.getPendingProducts = function () {
		var promise = AdminService.getPendingProducts();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 1;
			$rootScope.prodlength = result.data.data.length;
			$rootScope.variable = 3;
			/*$window.location.href = "/#admin/home";*/

		}, function (error) {
			alert("Error - " + error);
		});
	};

	$scope.advancedSearchWindowOptions = {
		title: "Advanced Search",
		visible: false,
		modal: true,
		width: "660",
		height: "400"
	}




	$scope.advancedSearchFarmers = function(){
		var info = {
			"firstName" : $scope.ffirstName,
		 "lastName" : $scope.lastName,
		 "city" : $scope.city,
		 "zipcode" : $scope.zipcode
		}
		var promise = AdminService.getFarmersByAdvancedSearch(info);
		promise.then(function(result){
			$scope.result = result.data.data;
			$rootScope.farmerResult = result.data.data;
			$rootScope.variable = 4;
			$window.location.href = "/#admin/farmersearch";
		},function(err){
			alert("Error -"+err);
		});
	}

	$scope.viewFarmerInfo = function(ssn){
	alert(ssn);
		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.farmerViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -"+err);
		});

	}

	$scope.updateInfoFarmer = function () {
		var info =
		{
			"firstName": $scope.res.firstName,
			"lastName": $scope.res.lastName,
			"email": $scope.res.email,
			"password" : $scope.res.password,
			"phoneNumber": $scope.res.phoneNumber,
			"ssn": $scope.res.ssn,
			"address": $scope.res.address,
			"state": $scope.res.state,
			"city": $scope.res.city,
			"zipCode": $scope.res.zipCode,
			"usertype" : $scope.res.usertype,
			"isApproved" : $scope.res.isApproved,
			"rating" : $scope.res.rating,
			"reviews" : $scope.res.reviews,
			"location" : $scope.res.location
		}
		var promise = AdminService.updateFarmerInfo(info);
		promise.then(function (result) {
			$scope.data = result.data.data;
			$scope.abcd = 2;
			$window.location.href = "/#admin/home"
		}, function (error) {
			alert("Error - " + error);
		});
	}

	$scope.updateInfoProduct = function(){
		var info = {
			"productName": $scope.res.productName,
			"productPrice": $scope.res.productPrice,
			"description": $scope.res.description,
			"farmerFirstName": $scope.res.farmerFirstName,
			"farmerLastName": $scope.res.farmerLastName,
			"farmerSSN": $scope.res.farmerSSN,
			"productImage": $scope.res.productImage,
			"productID": $scope.res.productID,
			"reviews": $scope.res.reviews,
			"isApproved": $scope.res.isApproved
		}
		var promise = AdminService.updateProductInfo(info);
		promise.then(function (result) {
			$scope.data = result.data.data;
			$scope.abcd = 1;
			$window.location.href = "/#admin/home"
		}, function (error) {
			alert("Error - " + error);
		});


	}

	$scope.updateInfoCustomer = function (){

		var info =
		{
			"firstName": $scope.res.firstName,
			"lastName": $scope.res.lastName,
			"email": $scope.res.email,
			"password" : $scope.res.password,
			"phoneNumber": $scope.res.phoneNumber,
			"ssn": $scope.res.ssn,
			"address": $scope.res.address,
			"state": $scope.res.state,
			"city": $scope.res.city,
			"zipCode": $scope.res.zipCode,
			"isApproved" : $scope.res.isApproved,
			"usertype" : $scope.res.usertype,
			"location" : $scope.res.location,
			"cardName" : $scope.res.cardName,
			"cardNumber" : $scope.res.cardNumber,
			"expiry" : $scope.res.expiry
		}
		var promise = AdminService.updateCustomerInfo(info);
		promise.then(function (result) {
			$scope.data = result.data.data;
			$scope.abcd = 2;
			$window.location.href = "/#admin/home"
		}, function (error) {
			alert("Error - " + error);
		});
	}

	$scope.viewCustomerInfo = function(ssn){
		alert(ssn);
		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.customerViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -"+err);
		});

	}

	$scope.viewProductInfo = function(productid){
		var info = {
			"productID" : productid
		}
		var promise = AdminService.productViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -"+err);
		});

	}

	$scope.advancedSearchCustomers = function(){
		var info = {
			"firstName" : $scope.firstName,
			"lastName" : $scope.lastName,
			"city" : $scope.city,
			"zipcode" : $scope.zipcode
		}
		var promise = AdminService.getCustomersByAdvancedSearch(info);
		promise.then(function(result){
			$scope.result = result.data.data;
			$rootScope.customerResult = result.data.data;
			$rootScope.variable = 5;
			$window.location.href = "/#admin/customersearch";
		},function(err){
			alert("Error -"+err);
		});
	}

	$scope.advancedSearchProducts = function(){
		var info ={
			"productName" : $scope.productName,
			"description" : $scope.description,
			"farmerFirstName" : $scope.farmerFirstName,
			"farmerLastName" : $scope.farmerLastName,
			"productPrice" : $scope.productPrice,
			"farmerSSN" : $scope.farmerSSN
		}

		var promise = AdminService.getProductsByAdvancedSearch(info);
		promise.then(function(result){
			$scope.result = result.data.data;
			$rootScope.productResult = result.data.data;
			$rootScope.variable = 6;
			$window.location.href = "/#admin/productsearch";
		},function(err){
			alert("Error -"+err);
		});
	}
	init();

}]);