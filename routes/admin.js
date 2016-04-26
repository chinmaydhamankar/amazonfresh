var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var adminHandler = require("../javascripts/admin/adminhandler");

router.post("/approvefarmer", function (req, res) {
    var data = req.body;
    data = JSON.stringify(data);
    var promise = adminHandler.approvecreatefarmer(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Farmer registration has been approved successfully!"
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





router.get("/listunapprovedfarmers", function (req, res) {
    console.log("here came");
    var promise = adminHandler.getAllUnApprovedFarmers();
    promise.done(function (unapprovedfarmers) {
        res.send({
            success: true,
            error: null,
            data: unapprovedfarmers
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


router.get("/listunapprovedproducts", function (req, res) {
    var promise = adminHandler.getAllUnApprovedProducts();
    promise.done(function (unapprovedproducts) {
        res.send({
            success: true,
            error: null,
            data: unapprovedproducts
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


router.get("/listunapprovedcustomers", function (req, res) {
    var promise = adminHandler.getAllUnApprovedCustomers();
    promise.done(function (unapprovedcustomers) {
        res.send({
            success: true,
            error: null,
            data: unapprovedcustomers
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
    console.log("In server part admin.js");
    var data = req.body;
    data = JSON.stringify(data);
    console.log("Data to be confirmed is :"+data);
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


router.post("/declinefarmer", function (req, res) {
    console.log("COMING devli");
    var data = req.body;
    data = JSON.stringify(data);
    console.log(data);
    var promise = adminHandler.declinefarmer(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Farmer registration has been declined successfully!"
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


router.post("/declineproduct", function (req, res) {
    console.log("COMING decline prod");
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
