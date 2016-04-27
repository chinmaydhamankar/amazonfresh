/**
 * Created by pratiksanglikar on 27/04/16.
 */
var app = angular.module("amazonfresh");
app.factory("AnalyticsService",["$http","$q","BillService", function ($http, $q, BillService) {
	var AnalyticsService = {
		getRevenueByDay: function () {
			return BillService.revenue();
		}
	};
	return AnalyticsService;
}]);