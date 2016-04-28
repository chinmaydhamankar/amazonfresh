/**
 * Created by pratiksanglikar on 28/04/16.
 */
var app = angular.module("amazonfresh");
app.factory("ValidationService", ["$http","$q","$window", function ($http, $q, $window) {
	var ValidationService = {

		/**
		 * validates the email address.
		 * @param email
		 * @returns {boolean}
		 * 			'true' if the email address is valid.
		 * 			'false' if the email address is not valid.	
		 */
		validateEmail: function (email) {
			if(this.isEmpty(email)){
				return false;
			}
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(!regex.test(email)) {
				return false;
			}
			return true;
		},

		/**
		 * validates the ssn.
		 * @param ssn
		 * @returns {boolean}
		 * 			'true' if the SSN is valid.
		 * 			'false' if the SSN is not valid.	
		 */
		validateSSN: function (ssn) {
			if(this.isEmpty(ssn)) {
				return false;
			}
			var regex = /\d{3}-\d{2}-\d{4}/;
			if(!regex.test(ssn)) {
				return false;
			}
			return true;
		},

		/**
		 * validates the zip code.
		 * @param zipCode
		 * @returns {boolean}
		 * 			'true' if the zip code is valid.
		 * 			'false' if the zip code is not valid.	
		 */
		validateZipCode: function (zipCode) {
			if(this.isEmpty(zipCode)) {
				return false;
			}
			var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
			if(!regex.test(zipCode)) {
				return false;
			}
			return true;
		},

		/**
		 * checks if the provided value is empty.
		 * @param value
		 * @returns {boolean}
		 * 			'true' if the provided value is empty
		 * 			'false' if the provided value is not empty.	
		 */
		isEmpty: function (value) {
			if(value === undefined || value === null || value === "") {
				return true;
			}
			return false;
		}
	};
	return ValidationService;
}]);