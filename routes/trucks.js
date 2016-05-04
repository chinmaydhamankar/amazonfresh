/**
 * Created by pratiksanglikar on 12/04/16.
 */
var express = require("express");
var Auth = require("./authentication");
var router = express.Router();

var MQClient = require("../rpc/client");
var QUEUE_NAME = "trucks_queue";
/**
 * function to return all trucks in the system.
 */
router.get("/", Auth.requireLogin, function (req, res) {
    var payload = {
        type: "get_all_trucks"
    };
    //var promise = TruckHandler.getAllTrucks();
    var promise = MQClient.request(QUEUE_NAME, payload);
    promise.done(function (data) {
        res.send({
            success: true,
            error: null,
            data: data.response
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

router.post("/search", Auth.requireLogin, function (req, res) {
    var data = req.body;
    data = JSON.stringify(data);
    //var promise = TruckHandler.searchByAnyAttributes(data);
	var promise = MQClient.request(QUEUE_NAME, {type: "search",data: data});
    promise.done(function (truckdata) {
        if(truckdata.statusCode === 200){
			res.send({
				success: true,
				error: null,
				data: truckdata.response
			});
		} else {
			res.send({
				success: false,
				error: "Some error occurred!",
				data: null
			});
		}

    }, function (error) {
        res.send({
            success: false,
            data: null,
            error: error
        });
    });
});

/**
 * get pending requests of drivers.
 */
router.get("/pending", Auth.requireLogin, function (req, res) {
    //var promise = TruckHandler.getPendingTrucks();
	var promise = MQClient.request(QUEUE_NAME, {type:"pending_trucks"});
    promise.done(function (data) {
		if(data.statusCode === 200){
			res.send({
				success: true,
				error: null,
				data: data.response
			});
		} else {
			res.send({
				success: false,
				error: "Some error occurred",
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

router.get("/id/:ssn", Auth.requireLogin, function (req, res) {
    var ssn = req.params.ssn;
    //var promise = TruckHandler.getTruck(ssn);
	var promise = MQClient.request(QUEUE_NAME, {
		type: "truck_by_id",
		ssn: ssn
	});
    promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				data: result.response,
				error: null
			});
		} else {
			res.send({
				success: true,
				data: result.error,
				error: null
			});
		}
    }, function (error) {
        res.send({
            success: false,
            data: null,
            error: error
        });
    });
});

/**
 * function to update the truck driver.
 */
router.put("/updateTruck", Auth.requireLogin, function (req, res) {
    var info = req.body.info;
	var payload = {
		type: "update_truck",
		info: info
	};
    //var promise = TruckHandler.updateTruckDriver(info);
	var promise = MQClient.request(QUEUE_NAME, payload);
    promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				data: result,
				error: null
			});
		} else {
			res.send({
				success: false,
				error: result.error,
				data: null
			});
		}

    }, function (error) {
        res.send({
            success: false,
            data: null,
            error: error
        });
    });
});

/**
 * function to register a truck driver into the system.
 */
router.post("/", function (req, res) {
	var payload = {
		type: "sign_up_truck",
		info: req.body.info
	};
    //var promise = TruckHandler.signuptruck(req.body.info);
	var promise = MQClient.request(QUEUE_NAME, payload);
    promise.done(function (result) {
		if(result.statusCode === 200) {
			res.send({
				success: true,
				error: null,
				data: "Truck registered successfully!"
			});
		} else {
			res.send({
				success: true,
				data: null,
				error: result.error
			});
		}

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
    //var promise = TruckHandler.delete(ssn);
	var promise = MQClient.request(QUEUE_NAME,{
		type: "delete_truck",
		ssn: ssn
	});
    promise.done(function (result) {
        if(result.statusCode === 200) {
			res.status(204)
				.send();
		} else {
			res.status(500)
				.send({
					success: false,
					error: result.error,
					data: null
				});
		}
    }, function (error) {
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
});

router.get("/populateDB", function (req, res) {
	var promise = MQClient.request("populateDB_queue",{type: "populate_bills"});
	promise.done(function () {
		res.send({
			status: "OK"
		});
	}, function (error) {
		res.send({
			status: "Failed!"
		});
	});
});

module.exports = router;
