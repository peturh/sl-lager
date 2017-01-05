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

    service.getItem = function (depotId) {
        return $http(
            {
                method: 'GET',
                url: "/depot/" + depotId
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.addNewItemToDepot = function (item, depotId) {
        var payload = {
            item: item,
            depotId: depotId
        };
        console.log(payload);
        return $http(
            {
                method: 'POST',
                data: payload,
                url: "/addNewItemToDepot"
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };
    service.addExistingItemToDepot = function (item, depotId) {
        var payload = {
            item: item,
            depotId: depotId
        };
        console.log(payload);
        return $http(
            {
                method: 'POST',
                data: payload,
                url: "/addExistingItemToDepot"
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.deleteItem = function(item){
        var payload = {
            item: item
        };
        console.log(payload);
        return $http(
            {
                method: 'POST',
                data: payload,
                url: "/deleteItem"
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.updateItem = function(item){
        var payload = {
            item: item
        };
        console.log(payload);
        return $http(
            {
                method: 'POST',
                data: payload,
                url: "/updateItem"
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.getDepotsWithItem = function(item){

        return $http(
            {
                method: 'GET',
                url: "/getDepotsWithItem/"+item._id
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