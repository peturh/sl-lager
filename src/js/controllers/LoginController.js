var app = require('app');

app.controller('LoginController', ['$state', 'UserService', 'MessageService',
    function ($state, UserService, MessageService) {
        var login = this;

        login.loginUser = {
            username: "",
            password: ""
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

        login.getStatus = function () {
            UserService.getLoginStatus().then(function (response) {

            })
        }
    }]);