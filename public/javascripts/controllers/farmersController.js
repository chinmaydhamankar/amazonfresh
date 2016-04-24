/**
 * Created by Chinmay on 14-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('FarmersController',["$scope","US_STATES","FarmerService",function ($scope, US_STATES, FarmerService) {
    function init(){
        new Card({
            form: document.querySelector('form'),
            container: '.card-wrapper'
        });
    }
    init();

    $scope.USStatesOptions = {
        dataSource: US_STATES,
        dataTextField: "name",
        dataValueField: "abbreviation"
    };

    $scope.signup = function () {
        var info = {
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "email": $scope.email,
            "password": $scope.credentials.password,
            "phoneNumber": $scope.phone,
            "ssn": $scope.ssn,
            "address": $scope.address,
            "state": $scope.state,
            "city": $scope.city,
            "zipCode": $scope.zipcode
        }
        var promise = FarmerService.signup(info);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

}]);


