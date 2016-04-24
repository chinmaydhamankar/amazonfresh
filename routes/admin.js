var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var adminHandler = require("../javascripts/admin/adminhandler");

router.post("/", function (req, res) {
    console.log("entered to approve");
    req.body.isApproved = true;
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


module.exports = router;
