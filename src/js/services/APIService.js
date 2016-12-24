var app = require('app');

app.service('APIService', ['$http', function ($http) {

    var service = {};

    /**
     * Get available sites from API
     * @returns {*} - The sites available
     */
    service.getSites = function () {
        return $http(
            {
                method: 'GET',
                url: "/items"
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

    service.getDevice = function (deviceId) {
        return $http(
            {
                method: 'GET',
                url: "/device/"+deviceId
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