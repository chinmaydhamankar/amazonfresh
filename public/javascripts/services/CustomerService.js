/**
 * Created by Chinmay on 20-04-2016.
 */

angular.module("amazonfresh").factory("CustomerService",["$window","$http","$q", function ($window, $http, $q) {
    var CustomerService = {
        signup: function (info) {
            var url = "http://localhost:3000/customers";
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
                if(error.status=== 302) {
                    $window.location.href = "http://localhost:3000/#auth/login";
                } else {
                    def.reject(error);
                }
            });
            return def.promise;
        }
    };
    return CustomerService;
}]);