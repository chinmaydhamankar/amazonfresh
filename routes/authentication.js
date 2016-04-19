/**
 * Created by pratiksanglikar on 13/04/16.
 */

var express = require('express');
var router = express.Router();
var Auth = require("../javascripts/authentication/authentication");
/**
 * returns the login page
 */
router.get('/login', function(req, res) {
	res.render('./index', { title : "Login" });
});

/**
 * Authenticates the user with given username and password
 */
router.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var promise = Auth.login(email, password);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (errorObject) {
		res.status(errorObject.statusCode).send({
			success: false,
			error: errorObject.error,
			data: null
		});
	});
});

/**
 * logouts the user from system.
 */
router.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
});

/**
 * function that checks if the user is logged in or not.
 * If not logged in, the user is redirected to login page.
 * @param req
 * @param res
 * @param next
 */
router.requireLogin  = function(req, res, next) {
	//TODO temporarily commenting till login functionality is implemented.
	/*if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}*/
	next();
};

module.exports = router;