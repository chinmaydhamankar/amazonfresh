/**
 * Created by pratiksanglikar on 12/04/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('trucks', { title: 'Trucks' });
});

module.exports = router;
