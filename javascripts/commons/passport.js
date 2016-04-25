/**
 * Created by pratiksanglikar on 24/04/16.
 */
var LocalStrategy = require("passport-local").Strategy;
var MongoDB = require('./mongodbhandler');
var PasswordManager = require("../authentication/passwordmanager");

module.exports = function (passport) {
	passport.use('local', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
	},
		function (email, password, done) {
			process.nextTick(function () {
				MongoDB.collection("users").findOne({
					email: email
				}, function (error, doc) {
					if (error) {
						return done(error);
					}
					if (doc) {
						if (doc.password === PasswordManager.encryptPassword(password)) {
							return done(null, doc);
						} else {
							return done(null, doc);
						}
					}
				});
			});
		}
	));
}