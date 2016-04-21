
var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var ProductHandler = require("../javascripts/products/productshandler");

/**
 * function that shows the home page for the truck driver.
 */
//added by me

/*router.get("/home", Auth.requireLogin, function(req, res) {
    res.render("trucks", { title: "Trucks" });
});*/

/**
 * function to create a product into the system.
 */
router.post("/", function (req, res) {
    var promise = ProductHandler.createproduct(req.body.info);
    promise.done(function () {
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
    });
});

/**
 * function to delete a product from the system.
 */
router.delete("/:productID", function (req, res) {
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
router.get("/", function (req, res) {
    var promise = ProductHandler.listallproducts();
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Products List!"
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

router.get("/:productID",function(req,res){
    var productID = req.params.productID;
    console.log(productID);
var promise= ProductHandler.getproductinfo(productID);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Got One Product with gien ID!"
        });
    }, function (error) {
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
router.post("/")
});
module.exports = router;
