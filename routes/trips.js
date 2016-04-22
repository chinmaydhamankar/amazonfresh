/**
 * Created by pratiksanglikar on 19/04/16.
 */
/**
 * Created by pratiksanglikar on 12/04/16.
 */
var express = require("express");
var router = express.Router();
var Auth = require("./authentication");
var TripHandler = require("../javascripts/trips/tripshandler");

/**
 * function to get information about a particular trip in the system.
 */
router.get("/:tripID", Auth.requireLogin, function (req, res) {
	//TODO
});

/**
 * function to generate a new trip.
 */
router.post("/", Auth.requireLogin, function (req, res) {
	var customerID = req.body.customerID,
		farmerID = req.body.farmerID,
		productID = req.body.productID;
	var promise = TripHandler.generateTrip(customerID, farmerID, productID);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

module.exports = router;
