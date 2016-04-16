/**
 * Created by pratiksanglikar on 15/04/16.
 */
angular.module("amazonfresh").directive('patternValidator', [
	function() {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function(scope, elem, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					var patt = new RegExp(attrs.patternValidator);
					var isValid = patt.test(viewValue);
					ctrl.$setValidity('passwordPattern', isValid);
					return viewValue;
				});
			}
		};
	}
]);