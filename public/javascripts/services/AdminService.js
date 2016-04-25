/**
 * Created by SHAILESH-PC on 4/24/2016.
 */

angular.module("amazonfresh").factory("AdminService",["$http","$q", function ($http, $q) {
    var AdminService = {
        signup: function () {
            alert("service used");
            var url = "http://localhost:3000/admin/listunapprovedfarmers";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {

                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        },
        getPendingProducts: function () {
            var url = "http://localhost:3000/admin/listunapprovedproducts";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {

                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        },

        getPendingCustomers: function () {
            var url = "http://localhost:3000/admin/listunapprovedcustomers";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {

                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        }
    };
    return AdminService;
}]);
