/**
 * Created by pratiksanglikar on 12/04/16.
 */

var app = angular.module("amazonfresh", ["ngRoute","kendo.directives"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when("/index", {
		templateUrl: "partials/login.html",
		controller: "AuthController"
	}).when("/customers/signup", {
		templateUrl: "partials/customers/signup.html",
		controller: "CustomersController"
	}).when("/trucks/signup", {
		templateUrl: "partials/trucks/signup.html",
		controller: "TrucksController"
	}).when("/admin/home", {
		templateUrl: "partials/admin/home.html",
		controller: "AdminController"
	}).when("/farmers/signup", {
		templateUrl: "partials/farmers/signup.html",
		controller: "FarmersController"
	}).when("/products/home", {
		templateUrl: "partials/products/products_list.html",
		controller: "ProductController"
	}).when("/farmers/home", {
		templateUrl: "partials/products/createproduct.html",
		controller: "ProductController"
	}).when("/bills/cart", {
		templateUrl: "partials/bills/cart.html",
		controller: "BillsController"
	}).when("/admin/farmersearch", {
		templateUrl: "partials/admin/farmersearch.html",
		controller: "AdminController"
	}).when("/admin/customersearch", {
		templateUrl: "partials/admin/customersearch.html",
		controller: "AdminController"
	}).when("/admin/productsearch", {
		templateUrl: "partials/admin/productsearch.html",
		controller: "AdminController"
	}).otherwise({
		redirectTo: "/index"
	});
	$locationProvider.html5Mode(false);
});

/*
app.controller("MyCtrl", function($scope){
});*/
