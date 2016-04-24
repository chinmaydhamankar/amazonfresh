/**
 * Created by Chinmay on 21-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('AdminController',function ($scope) {
    $scope.options = {
        tabPosition: "left"
    };

	$scope.advancedSearchWindowOptions = {
		title: "Advanced Search",
		visible: false,
		modal: true,
		width: "800",
		height: "300"
	}
});