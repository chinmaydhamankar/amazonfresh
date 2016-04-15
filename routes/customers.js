/**
 * Created by Chinmay on 13-04-2016.
 */
var express = require("express");
var router = express.Router();
<<<<<<< HEAD
=======

router.get("/home", function(req, res) {
    res.render("home", { title: "Welcome | AmazonFresh" });
});

>>>>>>> c2adbe8cf5ff3f9d5c2c1f820f9498a1e045939d
module.exports = router;