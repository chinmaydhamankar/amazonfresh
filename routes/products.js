var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var ProductHandler = require("../javascripts/products/productshandler");

/**
 * function to create a product into the system.
 */
router.post("/", Auth.requireLogin, function (req, res) {
	var promise = ProductHandler.createproduct(req.body.info);
	promise.done(function () {
		res.send({
			success: true,
			error: null,
			data: "Product created successfully!"
		});
	}, function (error) {
		res.status(500)
			.send({
				success: false,
				error: error,
				data: null
			});
	});
});

/**
 * function to delete a product from the system.
 */
router.delete("/:productID", Auth.requireLogin, function (req, res) {
	var productID = req.params.productID;
	console.log(productID);
	var promise = ProductHandler.delete(productID);
	promise.done(function () {
		res.status(204)
			.send();
	}, function (error) {
		res.status(500)
			.send({
				success: false,
				error: error,
				data: null
			});
	});
});
/**
 * function to list all products from the system.
 */
router.get("/", Auth.requireLogin, function (req, res) {
	var promise = ProductHandler.listallproducts();
	promise.done(function () {
		res.send({
			success: true,
			error: null,
			data: "Products List!"
		});
	}, function (error) {
		res.status(500)
			.send({
				success: false,
				error: error,
				data: null
			});
	});
});
/**
 * function to get a product from the system.
 */
router.get("/:productID", Auth.requireLogin, function (req, res) {
	var productID = req.params.productID;
	console.log(productID);
	var promise = ProductHandler.getproductinfo(productID);
	promise.done(function () {
		res.send({
			success: true,
			error: null,
			data: "Got One Product with given ID!"
		});
	}, function (error) {
		res.status(500)
			.send({
				success: false,
				error: error,
				data: null
			});
	});
});
router.post("/searchproduct", Auth.requireLogin, function (req, res) {
	var productName = req.body.productName;

	console.log(productName);
	var promise = ProductHandler.searchproduct(productName);
	promise.done(function () {
		res.send({
			success: true,
			error: null,
			data: "Got One Product!"
		});
	}, function (error) {
		res.status(500)
			.send({
				success: false,
				error: error,
				data: null
			});
	});
});

router.put("/", Auth.requireLogin, function (req, res) {
	var promise = ProductHandler.updateproduct(req.body.info);
	promise.done(function () {
		res.send({
			success: true,
			error: null,
			data: "products to be updated"
		});
	}, function (error) {
		res.status(500)
			.send({
				success: false,
				error: error,
				data: null
			});
	});
});
module.exports = router;
