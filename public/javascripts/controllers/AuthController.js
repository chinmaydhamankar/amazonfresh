/**
 * Created by pratiksanglikar on 12/04/16.
 */
var app = angular.module("amazonfresh");

app.controller('AuthController', ["$scope","$window","AuthService","USER_TYPES", function ($scope, $window, AuthService, UserTypes) {
	$scope.login = function () {
		var promise = AuthService.login($scope.email, $scope.password);
		promise.then(function (user) {
			if(user.usertype === UserTypes.ADMIN) {
				$scope.redirectToAdminPage();
			} else if(user.usertype === UserTypes.CUSTOMER) {
				$scope.redirectToCustomerHome();
			}
		}, function () {
			alert("Invalid!");
		});
	};

	$scope.redirectToCustomerHome = function () {
		$window.location.href = "/#products/home";
	}

	$scope.redirectToAdminPage = function () {
		$window.location.href = "/#admin/home";
	};
	
	$scope.redirectToFarmerSignUp = function () {
		$window.location.href = "/#farmers/signup";
	};
	
	$scope.redirectToDriverSignUp = function () {
		$window.location.href = "/#trucks/signup";
	};
}]);
