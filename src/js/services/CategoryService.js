var app = require('app');

app.service('CategoryService', ['$http', function ($http) {

    var service = {};

    /**
     * Get available depots from API
     * @returns {*} - The depots
     */
    service.getCategories = function () {
        return $http(
            {
                method: 'GET',
                url: "/productCategories"
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };


    service.addNewCategory = function (category) {
        var payload = {
            category : category
        };
        return $http(
            {
                method: 'POST',
                url: "/category/",
                data : payload
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };


    return service;
}]);