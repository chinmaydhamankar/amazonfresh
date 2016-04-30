/**
 * Created by pratiksanglikar on 19/04/16.
 */
/**
 * Created by pratiksanglikar on 12/04/16.
 */
var express = require("express");
var router = express.Router();
var Auth = require("./authentication");
var UserTypes = require("../javascripts/commons/constants").usertypes;
var MQClient = require("../rpc/client");
const QUEUE_NAME = "trips_queue";

router.get("/", Auth.requireLogin, function (req, res) {
	var payload = {
		type: "all_trips"
	};
	//var promise = TripHandler.getAllTrips();
	var promise = MQClient.request(QUEUE_NAME, payload);
	promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				error: null,
				data: result.response
			});
		} else {
			res.status(500).send({
				success: false,
				error: result.error,
				data: null
			});
		}

	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

/**
 * function to generate a new trip.
 */
router.post("/", Auth.requireLogin, function (req, res) {
	var customerID = req.body.customerID,
		farmerID = req.body.farmerID,
		productID = req.body.productID;
	var payload = {
		type: "generate_trip",
		info: {
			customerID: customerID,
			farmerID: farmerID,
			productID: productID
		}
	};
	//var promise = TripHandler.generateTrip(customerID, farmerID, productID);
	var promise = MQClient.request(QUEUE_NAME, payload);
	promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				error: null,
				data: "Trip registered successfully!"
			});
		} else {
			res.status(500).send({
				success: false,
				error: "Error occurred!",
				data: null
			});
		}

	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

/**
 * finds a trip with given trip ID.
 */
router.get("/id/:tripID", Auth.requireLogin, function (req, res) {
	var tripID = req.params.tripID;
	//var promise = TripHandler.findTripById(tripID);
	var payload = {
		type: "get_trip_id",
		tripID: tripID
	};
	var promise = MQClient.request(QUEUE_NAME, payload);
	promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				error: null,
				data: result.response
			});
		} else {
			res.send({
				success: false,
				error: "Error",
				data: result.error
			});
		}

	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

router.get("/analytics/bydriver", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var payload = {
		type: "trips_by_driver"
	}
	//var promise = TripHandler.getTripsByDriver();
	var promise = MQClient.request(QUEUE_NAME, payload);
	promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				error: null,
				data: result.response
			});
		} else {
			res.send({
				success: true,
				error: null,
				data: result.error
			});
		}

	}, function (error) {
		res.send({
			success: false,
			error: error,
			data: null
		});
	});
});

router.get("/analytics/bycustomer", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var payload = {
		type: "trips_by_customer"
	}
	//var promise = TripHandler.getTripsByCustomer();
	var promise = MQClient.request(QUEUE_NAME, payload);
	promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				error: null,
				data: result.response
			});
		} else {
			res.send({
				success: false,
				error: "Some error occurred!",
				data: result.error
			});
		}

	}, function (error) {
		res.send({
			success: false,
			error: error,
			data: null
		});
	});
});


/**
 * finds a trip with given driver ID.
 */
router.get("/driver/:driverID", Auth.requireLogin, function (req, res) {
	var driverID = req.params.driverID;
	//var promise = TripHandler.findTripsByDriver(driverID);
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

/**
 * finds a trip with given customer ID.
 */
router.get("/customer/:customerID", Auth.requireLogin, function (req, res) {
	var customerID = req.params.customerID;
	//var promise = TripHandler.findTripsByCustomer(customerID);
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


/**
 * finds a trip with given city.
 * //TODO fix this. Does not work!
 */
router.get("/city/:city", Auth.requireLogin, function (req, res) {
	var city = req.params.city;
	//var promise = TripHandler.findTripsByDeliveryCity(city);
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
