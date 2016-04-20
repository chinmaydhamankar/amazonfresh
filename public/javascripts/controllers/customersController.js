/**
 * Created by Chinmay on 14-04-2016.
 */

var app = angular.module("amazonfresh");
app.controller('CustomersController', ["$scope", "kendo.directives",function ($scope, KendoDirectives) {
    alert("HI");
    console.log("In cust controller");
    function init(){
        new Card({
            form: document.querySelector('form'),
            container: '.card-wrapper'
        });
    }
    init();
}]);
