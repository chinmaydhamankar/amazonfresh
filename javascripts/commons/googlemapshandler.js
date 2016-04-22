/**
 * Created by pratiksanglikar on 21/04/16.
 */
GoogleMaps = null;
var GoogleMapsAPI = require("googlemaps");
var q = require("q");

exports.initGoogleMaps = function () {
	GoogleMaps = new GoogleMapsAPI({
		key: "AIzaSyC-6Up5K0M_egpVpDL1oX8gk6rp79vG5yU",
		stagger_time: 1000, // for elevationPath
		encode_polylines: false,
		secure: true
	});
};

exports.getLatLang = function (address) {
	var deferred = q.defer();
	if (!GoogleMaps) {
		exports.initGoogleMaps();
	}
	GoogleMaps.geocode({
		"address": address
	}, function (err, result) {
		if (err) {
			deferred.reject(err);
		} else {
			var results = [];
			results.push(result.results[0].geometry.location.lat);
			results.push(result.results[0].geometry.location.lng);
			deferred.resolve(results);
		}
	});
	return deferred.promise;
};