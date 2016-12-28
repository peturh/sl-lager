var app = require('app');

app.service('DepotService', ['$http', function ($http) {

    var service = {};

    service.addNewDepot = function (depot) {
        var payload = {
            depot : depot
        };
        return $http(
            {
                method: 'POST',
                url: "/depot/",
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

    /**
     * Get available depots from API
     * @returns {*} - The depots
     */
    service.getDepots = function () {
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

    service.getDepot = function (depotId) {
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

    /**
     * Update the chosen item
     * @returns {*} -
     */
    service.updateItemInDepot = function (updatedItem,depotId) {
        var item = {
            item : updatedItem
        };
        return $http(
            {
                method: 'POST',
                url: "/updateItemInDepot/"+depotId,
                data : item
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