/**
 * Created by Chinmay on 21-04-2016.
 */

var express = require("express");
var router = express.Router();

router.get("/home",function(req, res) {
    res.render("home", { title: "Welcome Admin" });
});

module.exports = router;