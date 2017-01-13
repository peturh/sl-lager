/**
 * Created by petur on 2016-05-20.
 */
var app = require('app');

app.service('UserService', ['$http', function ($http) {

    var service = {};

    service.user = null;
    service.admin = null;

    service.register = function (credentials) {
        return $http(
            {
                method: 'POST',
                url: "/registerUser",
                data: credentials
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.login = function (credentials) {
        console.log(credentials);
        return $http(
            {
                method: 'POST',
                url: "/login",
                data: credentials
            })
            .success(function (data, status) {
                console.log(data);
                service.user = data;
                if (data.admin === true) {
                    service.admin = true;
                }
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };


    service.getLoginStatus = function (credentials) {
        return $http(
            {
                method: 'GET',
                url: "/status"
            })
            .success(function (data, status) {
                service.user = data;
                if (data.admin === true) {
                    service.admin = true;
                }
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });


    };

    service.logout = function () {
        return $http(
            {
                method: 'GET',
                url: "/logout"
            })
            .success(function (data, status) {
                console.log(data);
                service.user = null;
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.getUserByName = function (name) {
        return $http(
            {
                method: 'GET',
                url: "/user/" + name
            })
            .success(function (data, status) {
                service.user = data;
                if (data.admin === true) {
                    service.admin = true;
                }
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.assignDepotToUser = function (userId, depot) {
        var payload = {
            depot: depot,
            userId: userId
        };
        return $http(
            {
                method: 'POST',
                url: "/assignDepotToUser",
                data: payload
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.getUsers = function () {
        return $http(
            {
                method: 'GET',
                url: "/users/"
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.changePassword = function (oldPassword,newPassword) {
        var data = {
            id: service.user.id,
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        return $http(
            {
                method: 'POST',
                url: "/user/changePassword",
                data: data
            })
            .success(function (data, status) {
                return data;
            })
            .error(function (data, status) {
                console.log("failed", data);
                return "Request failed";
            });
    };

    service.changeEmail = function (newEmail) {
        var data = {
            id: service.user.id,
            newEmail: newEmail
        };
        return $http(
            {
                method: 'POST',
                url: "/user/changeEmail",
                data: data
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