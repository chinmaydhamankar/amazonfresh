/**
 * Created by Chinmay on 21-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('AdminController',["$scope", "$window", "$rootScope", "AdminService","ValidationService",
	function ($scope, $window, $rootScope, AdminService,ValidationService) {
	$scope.Customers = true;
	$scope.Farmers = true;
	$scope.Products = true;
	$scope.Trucks = true;

	$scope.notf1Options = {
		templates: [{
			type: "ngTemplate",
			template: $("#notificationTemplate").html()
		}]
	};

	$scope.$watch('type', function( val ) {
		if( val === 'Customers' ) {
			$scope.Customers = false;
			$scope.Farmers = true;
			$scope.Products = true;
			$scope.Trucks = true;
		} else if(val == 'Farmers'){
			$scope.Farmers = false;
			$scope.Customers = true;
			$scope.Products = true;
			$scope.Trucks = true;
		}
		else if(val == 'Products'){
			$scope.Products = false;
			$scope.Farmers = true;
			$scope.Customers = true;
			$scope.Trucks = true;
		}
		else if(val == 'Trucks')
		{
			$scope.Trucks = false;
			$scope.Farmers = true;
			$scope.Customers = true;
			$scope.Products = true;
		}
	});

	function init()
	{
		if(!$rootScope.variable)
		{
			$scope.getPendingCustomers();
			$scope.getPendingFarmers();
			$scope.getPendingProducts();
			$scope.getPendingTrucks();
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
		var promise = AdminService.getPendingFarmers();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$rootScope.farmlength = result.data.data.length;
			$rootScope.variable = 1;
		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};


	$scope.declineReq = function (ssn,productID,usertype) {
		var promise = AdminService.declineReq(ssn,productID);
		promise.then(function (result) {
			if (result == "f") {
				if (usertype == "FARMER") {
					$scope.getPendingFarmers();
				}
				else if (usertype == "CUSTOMER")
				{
					$scope.getPendingCustomers();
				}
				else
				{
					$scope.getPendingTrucks();
				}
			}
			else
			{
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};


	$scope.approveReq = function (ssn,productID,usertype) {
		var promise = AdminService.approveReq(ssn,productID);
		promise.then(function (result) {
			if (result == "f") {
				if (usertype == "FARMER") {

					$scope.getPendingFarmers();
				}
				else if (usertype == "CUSTOMER")
				{
					$scope.getPendingCustomers();
				}
				else
				{
					$scope.getPendingTrucks();
				}
			}
			else
			{
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error.data.error);
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
			alert("Error - " + error.data.error);
		});
	};

	$scope.getPendingTrucks = function(){
		var promise = AdminService.getPendingTrucks();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$rootScope.trucklength = result.data.data.length;
			$rootScope.variable = 7;

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	}

	$scope.getPendingProducts = function () {
		var promise = AdminService.getPendingProducts();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 1;
			$rootScope.prodlength = result.data.data.length;
			$rootScope.variable = 3;
			/*$window.location.href = "/#admin/home";*/

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};

	$scope.advancedSearchWindowOptions = {
		title: "Advanced Search",
		visible: false,
		modal: true,
		width: "660",
		height: "450"
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
			alert("Error -" + err.data.error);
		});
	}

	$scope.advancedSearchTrucks = function(){

		var info = {
			"firstName" : $scope.firstName,
			"lastName" : $scope.lastName,
			"truckManufacturer" : $scope.truckManufacturer,
			"truckModel" : $scope.truckModel,
			"email" : $scope.email,
			"ssn" : $scope.ssn
		}
		var promise = AdminService.getTrucksByAdvancedSearch(info);
		promise.then(function(result){

			$scope.result = result.data.data;
			$rootScope.truckResult = result.data.data;
			$rootScope.variable = 8;
			$window.location.href = "/#admin/trucksearch";
		},function(err){
			alert("Error -" + err.data.error);
		});
	}

	$scope.viewFarmerInfo = function(ssn){
		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.farmerViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error - " + err.data.error);
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
		var errors = _getUpdateFarmerValidationErrors(info);
		if(errors.length > 0 ){
			for(var i = 0 ; i < errors.length ; i++) {
				$scope.errorNotification.show({
					kValue: errors[i]
				},"ngTemplate");
			}
		}
		else {
			var promise = AdminService.updateFarmerInfo(info);
			promise.then(function (result) {
				$scope.data = result.data.data;
				$scope.abcd = 2;
				$window.location.href = "/#admin/home"
			}, function (error) {
				alert("Error - " + error.data.error);
			});
		}

	}

		_getUpdateFarmerValidationErrors = function (info) {
			var errors = [];
			if( ValidationService.isEmpty(info.firstName)) {
				errors.push("First Name can not be empty or invalid!");
			}

			if(ValidationService.isEmpty(info.lastName)) {
				errors.push("Last Name can not be empty or invalid!");
			}


			if( ValidationService.isEmpty(info.phoneNumber)) {
				errors.push("Phone Number can not be empty or invalid!");
			}

			if( ValidationService.isEmpty(info.address)) {
				errors.push("Address can not be empty!");
			}

			if( ValidationService.isEmpty(info.state)) {
				errors.push("State can not be empty!");
			}

			if(ValidationService.isEmpty(info.city)) {
				errors.push("City can not be empty!");
			}

			if(! ValidationService.validateZipCode(info.zipCode)) {
				errors.push("Zip Code can not be empty or invalid!");
			}

			return errors;
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
			var errors = _getUpdateProductValidationErrors(info);
			if(errors.length > 0) {
				for(var i = 0; i < errors.length ; i++) {
					$scope.errorNotification.show({
						kValue: errors[i]
					},"ngTemplate");
				}
			}
			else {
				var promise = AdminService.updateProductInfo(info);
				promise.then(function (result) {
					$scope.data = result.data.data;
					$scope.abcd = 1;
					$window.location.href = "/#admin/home"
				}, function (error) {
					alert("Error - " + error.data.error);
				});
			}

	}

		_getUpdateProductValidationErrors = function (info) {
			var errors = [];
			if( ValidationService.isEmpty(info.productName)) {
				errors.push("Product Name can not be empty!");
			}

			if(ValidationService.isEmpty(info.productPrice)) {
				errors.push("Product Price can not be empty!");
			}


			if( ValidationService.isEmpty(info.description)) {
				errors.push("Description can not be empty!");
			}

			if( ValidationService.isEmpty(info.farmerFirstName)) {
				errors.push("Farmer First Name can not be empty!");
			}

			if( ValidationService.isEmpty(info.farmerLastName)) {
				errors.push("Farmer Last Name can not be empty!");
			}
			return errors;
		}



		$scope.updateInfoTruck = function() {
		var info = {
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
			"truckManufacturer" : $scope.res.truckManufacturer,
			"truckModel" : $scope.res.truckModel,
			"freeFrom" : $scope.res.freeFrom
		};
		var errors = $scope.getValidateUpdateTruckErrors();
		if(errors.length > 0) {
			for(var i = 0; i < errors.length ; i++) {
				$scope.errorNotification.show({
					kValue: errors[i]
				},"ngTemplate");
			}
		} else {
			var promise = AdminService.updateTruckInfo(info);
			promise.then(function (result) {
				$scope.data = result.data.data;
				$scope.abcd = 2;
				$window.location.href = "/#admin/home"
			}, function (error) {
				alert("Error - " + error.data.error);
			});
		}
	}

	$scope.getValidateUpdateTruckErrors = function () {
		var errors = [];

		if (ValidationService.isEmpty($scope.res.firstName)) {
			errors.push("First name can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.lastName)) {
			errors.push("Last name can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.email)) {
			errors.push("Email can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.phoneNumber)) {
			errors.push("Phone number can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.ssn)) {
			errors.push("SSN can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.address)) {
			errors.push("Address can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.state)) {
			errors.push("State can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.city)) {
			errors.push("City can not be empty! ");
		}
		if (ValidationService.isEmpty($scope.res.zipCode)) {
			errors.push("Zip Code can not be empty! ");
		}
		if (!ValidationService.validateEmail($scope.res.email)) {
			errors.push("Email Address not valid! ");
		}
		if (!ValidationService.validateSSN($scope.res.ssn)) {
			errors.push("SSN not valid! ");
		}
		if (!ValidationService.validateZipCode($scope.res.zipCode)) {
			errors.push("Zip code not valid! ");
		}
		return errors;
	}

	$scope.goToRevenuePerDay = function(){
		$window.location.href = "http://localhost:3000/#analytics/revenue";
	}
	$scope.goToTripsPerCustomer = function(){
		$window.location.href =  "http://localhost:3000/#analytics/tripspercustomer";
	}

	$scope.goToTripsPerDriver = function(){
		$window.location.href = "http://localhost:3000/#analytics/tripsperdriver";
	}

	$scope.goToTripsAnalyticsMap = function(){
		$window.location.href = "http://localhost:3000/#analytics/tripsanalysismap";
	}



	$scope.getBillInfo = function(){
		var promise = AdminService.getBillInformation();
		promise.then(function(result){
			$scope.data = result.data.data;
			var bills = [];
			for(var bill in $scope.data) {
				bills.push($scope.data[bill]);
			}
			$scope.data = bills;
			$rootScope.variable = 10;
		},function(error){
			alert("Error - " + error.data.error);
		});
	}



	$scope.getTripsInfo = function(){
		var promise = AdminService.tripsInfo();
		promise.then(function (result) {
			$scope.data = result.data.data;
			$rootScope.variable = 9;
			for(var i = 0 ; i < $scope.data.length ; i++) {
				$scope.data[i].orderTimeString = new Date($scope.data[i].orderTime).toLocaleDateString();
				$scope.data[i].deliveryTimeString = new Date($scope.data[i].deliveryTime).toLocaleDateString();
				$scope.data[i].deliveryString = (new Date().getTime() > new Date($scope.data[i].deliveryTime))? "Delivered!": "In transit";
			}
		}, function (error) {
			alert("Error - " + error.data.error);
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
		var errors = _getUpdateCustomerValidationErrors(info);
		if(errors.length > 0 ){
			for(var i = 0 ; i < errors.length ; i++) {
				$scope.errorNotification.show({
					kValue: errors[i]
				},"ngTemplate");
			}
		}
		else {
			var promise = AdminService.updateCustomerInfo(info);
			promise.then(function (result) {
				$scope.data = result.data.data;
				$scope.abcd = 2;
				$window.location.href = "/#admin/home"
			}, function (error) {
				alert("Error - " + error.data.error);
			});
		}

	}

		_getUpdateCustomerValidationErrors = function (info) {
			var errors = [];
			if( ValidationService.isEmpty(info.firstName)) {
				errors.push("First Name can not be empty or invalid!");
			}

			if(ValidationService.isEmpty(info.lastName)) {
				errors.push("Last Name can not be empty or invalid!");
			}


			if( ValidationService.isEmpty(info.phoneNumber)) {
				errors.push("Phone Number can not be empty or invalid!");
			}

			if( ValidationService.isEmpty(info.address)) {
				errors.push("Address can not be empty!");
			}

			if( ValidationService.isEmpty(info.state)) {
				errors.push("State can not be empty!");
			}

			if(ValidationService.isEmpty(info.city)) {
				errors.push("City can not be empty!");
			}

			if(! ValidationService.validateZipCode(info.zipCode)) {
				errors.push("Zip Code can not be empty or invalid!");
			}

			return errors;
		}


		$scope.viewCustomerInfo = function(ssn){

		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.customerViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -"+err.data.error);
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
			alert("Error -"+err.data.error);
		});

	}

	$scope.viewTruckInfo = function(ssn){
		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.truckViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -" + err.data.error);
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
			alert("Error -" + err.data.error);
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
			alert("Error: " + err.data.error);
		});
	}
	init();

	$scope.notf1Options = {
		templates: [{
			type: "ngTemplate",
			template: $("#notificationTemplate").html()
		}]
	};



}]);