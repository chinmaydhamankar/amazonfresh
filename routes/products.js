
var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var ProductHandler = require("../javascripts/products/productshandler");
var UserTypes = require("../javascripts/commons/constants").usertypes;
var MQClient = require("../rpc/client");

/**
 * function to create a product into the system.
 */
router.post("/", Auth.requireLogin, function (req, res) {

    var user = req.session.user;
	var payload = {
		type: "createproduct",
		info: req.body.info,
		user: user
	};
	//var promise = ProductHandler.createproduct(req.body.info, user);
	var promise = MQClient.request("products_queue", payload);
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
	/*promise.done(function () {
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
	});*/
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
	var payload = {
		type: "listallproducts",

	};
	//var promise = ProductHandler.listallproducts();
	var promise = MQClient.request("products_queue", payload);
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
	/*promise.done(function (data) {
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
			});*/
	});
});
/**
 * function to get a product from the system.
 */
router.get("/id/:productID", Auth.requireLogin, function (req, res) {

	var productID = req.params.productID;
	var payload = {
		type: "getproductinfo",
		productID: productID
	};
	console.log(productID);
	// var promise = ProductHandler.getproductinfo(productID);
	var promise = MQClient.request("products_queue", payload);
	/*promise.done(function () {
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
	});*/

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
 * Adds a product to the cart.
 */
router.post("/cart/", Auth.requireLogin, function (req, res) {
	var productID = req.body.productID;
	console.log(productID);
	var user = req.session.user;
	if(user.usertype !== UserTypes.CUSTOMER) {
		res.status(500)
			.send({
				success: false,
				error: "Only customer can access this functionality!",
				data: null
			});
	} else {
		if(!req.session.cart) {
			req.session.cart = [];
		}
		req.session.cart.push({
			productID: productID,
			quantity: 1
		});
		res.send({
			success: true,
			error: null,
			data: req.session.cart
		});
	}
});

router.put("/cart/", Auth.requireLogin, function (req, res) {
	var productID = req.body.productID;
	var quantity = req.body.quantity;
	console.log(productID);
	console.log(quantity);
	var user = req.session.user;
	if(user.usertype !== UserTypes.CUSTOMER) {
		res.status(500)
			.send({
				success: false,
				error: "Only customer can access this functionality!",
				data: null
			});
	} else {
		if(!req.session.cart) {
			req.session.cart = [];
		}
		var cart = req.session.cart;
		for(var i = 0 ; i < cart.length; i++) {
			if(cart[i].productID === productID) {
				cart[i].quantity = quantity;
				break;
			}
		}
		req.session.cart = cart;
		res.send({
			success: true,
			error: null,
			data: req.session.cart
		});
	}
});

router.get("/cart/", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.CUSTOMER) {
		res.status(500)
			.send({
				success: false,
				error: "Only customer can access this functionality!",
				data: null
			});
	} else {
		if(!req.session.cart) {
			req.session.cart = [];
		}
		res.send({
			success: true,
			error: null,
			data: req.session.cart
		});
	}
});

router.delete("/cart/:productID", Auth.requireLogin, function (req, res) {
	var productID = req.params.productID;
	console.log(productID);
	var user = req.session.user;
	if(user.usertype !== UserTypes.CUSTOMER) {
		res.status(500)
			.send({
				success: false,
				error: "Only customer can access this functionality!",
				data: null
			});
	} else {
		if(!req.session.cart) {
			res.send({
				success: true,
				error: null,
				data: req.session.cart
			});
			return;
		}
		var cart = req.session.cart;
		var index = 0;
		for(var i = 0 ; i < cart.length ; i++) {
			if(cart[i].productID === productID) {
				index = i;
				break;
			}
		}
		cart.splice(index, 1);
		req.session.cart = cart;
		res.send({
			success: true,
			error: null,
			data: req.session.cart
		});
	}
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

	console.log("In product.js module");
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