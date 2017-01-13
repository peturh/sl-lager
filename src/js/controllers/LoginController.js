var app = require('app');

app.controller('LoginController', ['$state', 'UserService', 'MessageService',
    function ($state, UserService, MessageService) {
        var login = this;

        login.loginUser = {
            username: "",
            password: ""
        };

        login.registerUser = {
            username: "",
            password: "",
            email: ""
        };


        login.loginUserFn = function (event, user) {
            UserService.login(user).then(function (response) {
                if (typeof UserService.user.depot !== "undefined" && !UserService.admin) {
                    $state.go('depot', {id : UserService.user.depot});
                }

                else if(UserService.admin){
                    $state.go('/');
                }
                else if(UserService.user && !UserService.user.depot){
                    MessageService.showDialogMessage("You don't have a depot assigned. Please contact the administrator.",event);
                }

            },function(error){
                MessageService.showToastError("Wrong username or password!");
            });
        };


        login.register = function (event,user) {
            UserService.register(user).then(function (response) {
                UserService.login(user).then(function (response) {
                    MessageService.showDialogMessage("You have successfully registered. However, you need to contact an administrator to get a depot assigned to you before you can continue.",event);
                    login.registerUser = {
                        username: "",
                        password: "",
                        email: ""
                    };
                });
            },function(error){
                MessageService.showToastError("Could not register, username already exists.");
            })
        };

        login.getStatus = function () {
            UserService.getLoginStatus().then(function (response) {

            })
        }
    }]);