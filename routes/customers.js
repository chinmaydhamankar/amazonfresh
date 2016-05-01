/**
 * Created by Chinmay on 13-04-2016.
 */
var express = require("express");
var router = express.Router();
var CustomersHandler = require("../javascripts/customers/customershandler");
var Auth = require("./authentication");
var UserTypes = require("../javascripts/commons/constants").usertypes;
var MQClient = require("../rpc/client");
const QUEUE_NAME = "customers_queue";

router.post("/",function (req, res) {

    var promise = MQClient.request(QUEUE_NAME, {type: "signup_customer",data: req.body.info});
    promise.done(function (result) {
        res.send({
            success: true,
            error: null,
            data: "Customer is registered successfully!"
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
 * function to get List of all customer from the system.
 */
router.get("/", Auth.requireLogin, function(req,res) {
    var promise = CustomersHandler.getCustomersList();
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


router.put("/updateCustomer", Auth.requireLogin, function (req, res) {
    var promise = MQClient.request(QUEUE_NAME, {type: "update_customer",data: req.body.info});
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Customer data updated"
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
 * function to delete a customer from the system.
 */
router.delete("/:ssn", Auth.requireLogin, function (req, res) {
    var ssn = req.params.ssn;
    var promise = CustomersHandler.deleteCustomer(ssn);
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