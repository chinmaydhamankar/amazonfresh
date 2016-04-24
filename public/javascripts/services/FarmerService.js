
angular.module("amazonfresh").factory("FarmerService",["$http","$q", function ($http, $q) {
    var FarmerService = {
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
                def.reject(error);
            });
            return def.promise;
        }
    };
    return FarmerService;
}]);