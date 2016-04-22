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
	
});

/**
 * function to register a truck driver into the system.
 */
router.post("/", Auth.requireLogin, function (req, res) {
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

router.delete("/:ssn", function (req, res) {
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
