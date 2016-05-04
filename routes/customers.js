/**
 * Created by Chinmay on 13-04-2016.
 */
var express = require("express");
var router = express.Router();
var Auth = require("./authentication");
var MQClient = require("../rpc/client");
const QUEUE_NAME = "customers_queue";

router.post("/",function (req, res) {
    var promise = MQClient.request(QUEUE_NAME, {type: "signup_customer",data: req.body.info});
    promise.done(function (result) {
        if(result.statusCode == 200)
        {
            res.send({
                success: true,
                error: null,
                data: "Customer is registered successfully!"
            });
        }
        else
        {
            console.log("Errrrorrr is "+result.error);
            res.status(500)
                .send({
                    success: false,
                    error: result.error
                });
        }

    }, function (error) {
        console.log("Eoorror is"+error);
        res.status(500)
            .send({
                success: false,
                error: error
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


module.exports = router;