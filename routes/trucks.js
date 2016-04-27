/**
 * Created by pratiksanglikar on 12/04/16.
 */
var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var TruckHandler = require("../javascripts/trucks/truckshandler");

/**
 * function to return all trucks in the system.
 */
router.get("/", Auth.requireLogin, function (req, res) {
	var promise = TruckHandler.getAllTrucks();
	promise.done(function (data) {
		res.send({
			success: true,
			error: null,
			data: data
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
 * function to update the truck driver.
 */
router.put("/:truckId", Auth.requireLogin, function (req, res) {
	var info = req.body.info;
	var truckID = req.params.truckId;
	var promise = TruckHandler.updateTruckDriver(truckID, info);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}).catch(function (error) {
		res.status(500)
			.send({
				success: false,
				error: error,
				data: null
			});
	});
});

/**
 * function to register a truck driver into the system.
 */
router.post("/", function (req, res) {
	console.log("info:" + req.body.info);
	var promise = TruckHandler.signuptruck(req.body.info);
	promise.done(function () {
		res.send({
			success: true,
			error: null,
			data: "Truck registered successfully!"
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
 * function to delete a truck driver from the system.
 */

router.delete("/:ssn", Auth.requireLogin, function (req, res) {
	var ssn = req.params.ssn;
	var promise = TruckHandler.delete(ssn);
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

module.exports = router;
