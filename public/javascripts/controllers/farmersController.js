/**
 * Created by Chinmay on 14-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('FarmersController',["$scope","US_STATES","FarmerService","ProductService",function ($scope, US_STATES, FarmerService,ProductService) {
    /*
    function init(){
        new Card({
            form: document.querySelector('form'),
            container: '.card-wrapper'
        });
    }
    init();
    */

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



    $scope.getMyProfile = function () {
        var promise = FarmerService.getMyProfile();
        promise.then(function (result) {
            alert(result.data.data.password);
            $scope.data = result.data.data;
            $scope.abcd = 2;
            $scope.farmlength = result.data.data.length;
            for(var i = 0 ; i < US_STATES.length; i++ ) {
                if(US_STATES[i].abbreviation === $scope.data.state) {
                    $scope.stateDropDownList.select(i);
                    break;
                }
            }


        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.updateFarmerProfile = function () {
        var info =
        {
            "firstName": $scope.data.firstName,
            "lastName": $scope.data.lastName,
            "email": $scope.data.email,
            "password" : $scope.data.password,
            "phoneNumber": $scope.data.phoneNumber,
            "ssn": $scope.data.ssn,
            "address": $scope.data.address,
            "state": $scope.state,
            "city": $scope.data.city,
            "zipCode": $scope.data.zipCode,
            "usertype" : $scope.data.usertype,
            "rating" : $scope.data.rating,
            "reviews" : $scope.data.reviews,
            "location" : $scope.data.location
        }
        var promise = FarmerService.updateFarmerProfile(info);
        promise.then(function (result) {
            $scope.data = result.data.data;
            $scope.abcd = 2;



        }, function (error) {
            alert("Error - " + error);
        });

    };


    $scope.createproduct = function () {
           alert("seleeee");
        var info = {
            "productName": $scope.productName,
            "productPrice": $scope.productPrice,
            "description": $scope.description,
            "productImage": $scope.productImage

        }
        var promise = ProductService.createproduct(info);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }




}]);


