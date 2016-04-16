/**
 * Created by Chinmay on 13-04-2016.
 */
var express = require("express");
var router = express.Router();
var CustomersHandler = require("../javascripts/customers/customershandler");

router.get("/home", function(req, res) {
    res.render("home", { title: "Welcome | AmazonFresh" });
});

router.post("/",function (req, res) {
    console.log("In sign up function");
    var promise = CustomersHandler.signup(req.body.info);
    promise.done(function () {
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

module.exports = router;