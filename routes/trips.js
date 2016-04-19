/**
 * Created by pratiksanglikar on 19/04/16.
 */
/**
 * Created by pratiksanglikar on 12/04/16.
 */
var express = require("express");
var router = express.Router();
var Auth = require("./authentication");

/**
 * function to register a truck driver into the system.
 */
router.get("/:tripID", Auth.requireLogin, function (req, res) {
	res.send({
		response:"ok"
	});
});

module.exports = router;
