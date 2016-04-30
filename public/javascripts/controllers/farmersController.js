/**
 * Created by Chinmay on 14-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('FarmersController',["$scope","US_STATES","FarmerService","ProductService","ValidationService",
    function ($scope, US_STATES, FarmerService,ProductService,ValidationService) {
    $scope.credentials = {};

    $scope.USStatesOptions = {
        dataSource: US_STATES,
        dataTextField: "name",
        dataValueField: "abbreviation"
    };

    $scope.signup = function () {
        if($scope.credentials.password !== $scope.verifyPassword){
            $scope.errorNotification.show({
                kValue: "Password do not match!"
            },"ngTemplate");
        }

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
        var errors = _getfarmErrors(info);
        if(errors.length > 0 ){
            for(var i = 0 ; i < errors.length ; i++) {
                $scope.errorNotification.show({
                    kValue: errors[i]
                },"ngTemplate");
            }
        }
        else
        {
            var promise = FarmerService.signup(info);
            promise.then(function (result) {
                alert("Success!");
            }, function (error) {
                alert("Error - " + error);
            });
        }
    }

    $scope.notf1Options = {
        templates: [{
            type: "ngTemplate",
            template: $("#notificationTemplate").html()
        }]
    };


    $scope.regProduct = function ()
    {
        $scope.vari = 2;
    }


    $scope.getMyProfile = function () {
        $scope.vari = 1;
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
           $scope.vari = 2;
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



    _getfarmErrors = function (info) {
        var errors = [];
        if(! ValidationService.validateCharacters(info.firstName)) {
            errors.push("First Name can not be empty or invalid!");
        }

        if(!ValidationService.validateCharacters(info.lastName)) {
            errors.push("Last Name can not be empty or invalid!");
        }

        if(! ValidationService.validateEmail(info.email)) {
            errors.push("Email can not be empty or invalid!");
        }

        if(! ValidationService.validatePassword(info.password)) {
            errors.push("Password should contain 8 characters " +
                "1 uppercase character " +
                "1 special character!" +
                "1 digit" +
                "3 lowercase character");
        }

        if(ValidationService.isEmpty(info.phoneNumber)) {
            errors.push("Phone Number can not be empty or invalid!");
        }

        if(! ValidationService.validateSSN(info.ssn)) {
            errors.push("SSN can not be empty or invalid!");
        }

        if(ValidationService.isEmpty(info.address)) {
            errors.push("Address can not be empty!");
        }

        if( ValidationService.isEmpty(info.state)) {
            errors.push("State can not be empty!");
        }

        if( ValidationService.isEmpty(info.city)) {
            errors.push("City can not be empty!");
        }

        if(! ValidationService.validateZipCode(info.zipCode)) {
            errors.push("Zip Code can not be empty or invalid!");
        }
        return errors;
    }

}]);


