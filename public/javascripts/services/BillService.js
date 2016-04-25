/**
 * Created by Abhay on 4/24/2016.
 */


angular.module("amazonfresh").factory("BillService",["$http","$q", function ($http, $q) {
    var BillService = {
        generatebill: function (info) {
            alert(" service ala")
            var url = "http://localhost:3000/bills/generatebill";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                    "info": info
                }
            }).then(function (data) {
                if (data.data.success) {
                    def.resolve();
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        },

        deletebill: function (info) {
            var url = "http://localhost:3000/bills/62";
            var def = $q.defer();
            $http({
                method: 'DELETE',
                url: url,
                data: {
                    "info": info
                }
            }).then(function (data) {
                if (data.status==204) {
                    def.resolve();
                } else {
                    alert("ala error")
                    def.reject(data.data.error);
                }
            }, function (error) {
                //alert("ala error")
                def.reject(error);
            });
            return def.promise;
        },

        searchbill: function (info) {
            alert(" service ala")
            var url = "http://localhost:3000/bills/searchbill/60";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {
                    "info": info
                }
            }).then(function (data) {
                if (data.data.success) {
                    alert(data)
                    def.resolve();
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        }

    };
    return BillService;
}]);