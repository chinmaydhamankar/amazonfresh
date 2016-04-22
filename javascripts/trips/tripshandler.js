/**
 * Created by pratiksanglikar on 19/04/16.
 */

var q = require("q");
var CustomerHandler = require("../customers/customershandler");
var FarmerHandler = require("../farmers/farmerhandler");
var ProductHandler = require("../products/productshandler");

exports.generateTrip = function (customerID, farmerID, productID) {
	var deferred = q.defer();
	var customerPromise = CustomerHandler.getCustomer(customerID);
	var farmerPromise = FarmerHandler.getFarmerInfo(farmerID);
	var productPromise = ProductHandler.getproductinfo(productID);
	
	q.all([customerPromise, farmerPromise, productPromise], function (values) {
		
	}, function (error) {
		deferred.reject(error);
	});
}