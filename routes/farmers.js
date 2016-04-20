/**
 * Created by SHAILESH-PC on 4/14/2016.
 */
var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var FarmerHandler = require("../javascripts/farmers/farmerhandler");

/**
 * function that shows the home page for the truck driver.
 */
/*
router.get("/home", function(req, res) {
    res.render("farmers", { title: "farmers" });
});
*/
/**
 * function to register a truck driver into the system.
 */
router.post("/", function (req, res) {
    console.log("ala re ala");
    var promise = FarmerHandler.createfarmer(req.body.info);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Farmer has been registered successfully!"
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

router.delete("/:ssn", function (req, res) {
    var ssn = req.params.ssn;
    var promise = FarmerHandler.delete(ssn);
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
