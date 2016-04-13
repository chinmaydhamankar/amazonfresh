/**
 * Created by Chinmay on 13-04-2016.
 */
var express = require('express');
var router = express.Router();

router.get('/homepage', function(req, res, next) {
    res.render('home', { title: 'Welcome | AmazonFresh' });
});

router.get('/signin', function(req, res, next) {
    res.render('customers/signin', { title: 'Amazon.com Sign In' });
});


module.exports = router;