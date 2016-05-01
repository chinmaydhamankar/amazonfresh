var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var adminHandler = require("../javascripts/admin/adminhandler");
var farmerHandler = require("../javascripts/farmers/farmerhandler");
var customerHandler = require("../javascripts/customers/customershandler");
var productHandler = require("../javascripts/products/productshandler");


var UserTypes = require("../javascripts/commons/constants").usertypes;
var MQClient = require("../rpc/client");
const QUEUE_NAME = "admin_queue";

/**
 * Approves a farmer.
 */
router.post("/approvefarmer", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	req.body.isApproved = true;
	var data = req.body;
	data = JSON.stringify(data);
	var promise = MQClient.request(QUEUE_NAME, {type: "approve_request",data: data});
	//var promise = adminHandler.approvecreatefarmer(data);
	promise.done(function (result) {
		if(result.statusCode == 200){
			console.log("approved..!!!!!!!");
			res.send({
				success: true,
				error: null
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
 * returns the list of un-approved farmers.
 */
router.get("/listunapprovedfarmers", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var promise = MQClient.request(QUEUE_NAME, {type: "getUnapprovedFarmers"});
	promise.done(function (result) {
		if(result.statusCode == 200)
		{
			res.send({
				success: true,
				error: null,
				data: result.data
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
 * returns the list of un-approved products.
 */
router.get("/listunapprovedproducts", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}

	var promise = MQClient.request(QUEUE_NAME, {type: "getUnapprovedProducts"});
	promise.done(function (result) {
		if(result.statusCode == 200)
		{
			res.send({
				success: true,
				error: null,
				data: result.data
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
 * returns the list of un-approved customers.
 */
router.get("/listunapprovedcustomers", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}

	var promise = MQClient.request(QUEUE_NAME, {type: "listUnapprovedCustomers"});
	console.log("request sent");
	//var promise = adminHandler.getAllUnApprovedCustomers();
	promise.done(function (result) {
		if(result.statusCode == 200){
			res.send({
				success: true,
				error: null,
				data: result.data
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

router.post("/approveproduct", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = adminHandler.approveproduct(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Product has been approved successfully!"
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

router.post("/farmerViewInfo",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    console.log("SSNSNSNSNSNSNSN------"+data);

	var promise = MQClient.request("farmer_queue", {type: "view_farmer",data: data});
    promise.done(function (result) {
		if(result.statusCode == 200)
		{
			res.send({
				success: true,
				error: null,
				data: result.data
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

router.post("/customerViewInfo",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
	var promise = MQClient.request(QUEUE_NAME, {type: "view_customer",data:data});
    promise.done(function (result) {
		if(result.statusCode == 200) {
			res.send({
				success: true,
				error: null,
				data: result.data
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



router.post("/productViewInfo",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
	var promise = MQClient.request("products_queue", {type: "product_viewInfo",data: data});
   // var promise = productHandler.searchByProductId(data);
    promise.done(function (result) {
		if(result.statusCode == 200)
		{
			res.send({
				success: true,
				error: null,
				data: result.data
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

router.post("/getFarmersByAdvancedSearch",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
	console.log(data);
    data = JSON.stringify(data);
	var promise = MQClient.request("farmer_queue", {type : "searchfarmer",data : data});
   // var promise = farmerHandler.searchFarmerInfo(data);
	console.log("Commiting these chage" + data);
    promise.done(function(result){
		if(result.statusCode == 200)
		{
			res.send({
				success: true,
				error: null,
				data: result.data
			});
		}

    },function(err){
        res.status(500)
            .send({
                success: false,
                error: err,
                data: null
            });
    });
});

router.post("/getProductsByAdvancedSearch",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
	var promise = MQClient.request("products_queue", {type: "advanced_search_product",data: data});
    //var promise = productHandler.searchProductInfo(data);
    promise.done(function(result){
		if(result.statusCode == 200)
		{
			res.send({
				success: true,
				error: null,
				data: result.data
			});
		}

    },function(err){
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
});



router.post("/getCustomersByAdvancedSearch",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
	var promise = MQClient.request(QUEUE_NAME, {type: "customer_advanced_search",data: data});
    promise.done(function(result){
		if(result.statusCode == 200){
			res.send({
				success: true,
				error: null,
				data: result.data
			});
		}

    },function(err){
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });

});


router.post("/declinefarmer", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
	var promise = MQClient.request(QUEUE_NAME, {type: "decline_request",data: data});
    promise.done(function (result) {
		if(result.statusCode == 200)
		{
			res.send({
				success: true,
				error: null
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


router.post("/declineproduct", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    console.log(data);
    var promise = adminHandler.declineproduct(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Product registration has been declined successfully!"
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

router.post("/approveproduct", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = adminHandler.approveproduct(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Product has been approved successfully!"
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



router.post("/approvecustomer", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = adminHandler.approvecustomer(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Customer has been approved successfully!"
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
