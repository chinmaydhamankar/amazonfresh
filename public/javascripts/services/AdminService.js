/**
 * Created by SHAILESH-PC on 4/24/2016.
 */

angular.module("amazonfresh").factory("AdminService",["$http","$q", function ($http, $q) {
    var AdminService = {
        signup: function () {
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

        declineReq: function (ssn,productName) {
            alert("Here Hit" + ssn);
            var url,x;
            if (productName === undefined) {
                 url = "http://localhost:3000/admin/declinefarmer";
                x = "f";
            }
            else
            {
                url = "http://localhost:3000/admin/declineproduct";
                x = "p";
            }
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                  "ssn" : ssn,
                    "productName" : productName
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(x);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        },

        approveReq: function (ssn,productName) {
            alert("Here Hit" + productName);
            var url,x;
            if (productName == undefined) {
                console.log("****************");
                url = "http://localhost:3000/admin/approvefarmer";
                x = "f";
            }
            else
            {
                console.log("In else of admin service for products");
                url = "http://localhost:3000/admin/approveproduct";
                x = "p";
            }
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                    "ssn" : ssn,
                    "productName" : productName
                }
            }).then(function (data) {
                if (data) {
                    console.log("In if of return data admin service");
                    def.resolve(x);
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
                url: url
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
