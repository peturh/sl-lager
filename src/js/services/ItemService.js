var app = require('app');

app.service('ItemService', ['$http', function ($http) {

    var service = {};

    /**
     * Get available depots from API
     * @returns {*} - The depots
     */
    service.getItems = function () {
        return $http(
            {
                method: 'GET',
                url: "/depots"
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    /**
     * Get additional information from device
     * @returns {*} - The device
     */

    service.getItem = function (depotId) {
        return $http(
            {
                method: 'GET',
                url: "/depot/"+depotId
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