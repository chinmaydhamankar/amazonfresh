
angular.module("amazonfresh").factory("FarmerService",["$http","$q", function ($http, $q) {
    var FarmerService = {

        getMyProfile : function () {
            alert("Reached Here");
            var url = "http://localhost:3000/farmers/111-11-9910";
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
        updateFarmerProfile : function (info) {
            alert("Reached Her1111e");
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
        signup: function (info) {
            var url = "http://localhost:3000/farmers";
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
                if(error.status=== 302)
                 def.reject(error);
            });
            return def.promise;
        }
    };
    return FarmerService;
}]);