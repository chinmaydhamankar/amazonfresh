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

        getFarmersByAdvancedSearch :function(info){
            var url = "http://localhost:3000/admin/getFarmersByAdvancedSearch";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        getProductsByAdvancedSearch :function(info){
            var url = "http://localhost:3000/admin/getProductsByAdvancedSearch";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        farmerViewInfo : function(info)
        {
            var url = "http://localhost:3000/admin/farmerViewInfo";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        customerViewInfo : function(info)
        {
            var url = "http://localhost:3000/admin/customerViewInfo";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        updateCustomerInfo:function(info){
            var url = "http://localhost:3000/customers/updateCustomer";
            var def = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: {
                    "info" : info
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

        updateProductInfo:function(info){
            alert("In admin service");
            var url = "http://localhost:3000/products";
            var def = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: {
                    "info" : info
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


        updateFarmerInfo: function(info){
            var url = "http://localhost:3000/farmers/updateFarmer";
            var def = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: {
                    "info" : info
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


        productViewInfo : function(info)
        {
            var url = "http://localhost:3000/admin/productViewInfo";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },




        getCustomersByAdvancedSearch :function(info){
            var url = "http://localhost:3000/admin/getCustomersByAdvancedSearch";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },




        approveReq: function (ssn,productName) {
            var url,x;
            if (productName == undefined) {
                url = "http://localhost:3000/admin/approvefarmer";
                x = "f";
            }
            else
            {
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
