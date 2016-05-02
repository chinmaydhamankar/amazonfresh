
angular.module("amazonfresh").factory("FarmerService",["$window","$http","$q", function ($window,$http, $q) {
    var FarmerService = {

        getMyProfile : function () {
            //alert("Reached Here");
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
                if(error.status === 302) {
                    $window.location.href = "http://localhost:3000/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },


        updateFarmerProfile : function (info) {
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
                if(error.status === 302)
                {
                    $window.location.href = "http://localhost:3000/#auth/login";
                }
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
                    $window.location.href = "http://localhost:3000/#auth/login";
                    def.resolve();
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error.data.error);
            });
            return def.promise;
        }
    };
    return FarmerService;
}]);