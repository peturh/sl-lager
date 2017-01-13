/**
 * Created by petur on 2016-05-19.
 */
/**
 * Created by petur on 2016-05-19.
 */
var app = require('app');

app.controller('UserController', ['$scope', '$state', '$mdDialog', 'UserService',
    function ($scope, $state, $mdDialog, UserService) {
        var user = this;


        user.newEmail = "";
        user.repeatNewEmail = "";
        user.oldEmail = "";


        user.registerUser = {
            username: "",
            password: "",
            email: ""
        };

        user.oldPassword = "";
        user.newPassword = "";
        user.repeatNewPassword = "";

        user.init = function () {
            UserService.getLoginStatus().then(function (response) {
                user.email = response.data.email;
            });
            UserService.getUsers().then(function (response) {
                user.users = response.data;
                console.log(response.data);
            })

        };

        function updateView(){
            UserService.getLoginStatus().then(function (response) {
                user.email = response.data.email;
            });
            UserService.getUsers().then(function (response) {
                user.users = response.data;
                console.log(response.data);
            })

        }

        user.hello = function()  {
            console.log("HLLO");
        }

        user.showDepotDialog = function (ev, userId) {
            $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'DepotService', DepotSelectionController],
                    templateUrl: 'depotSelection.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                .then(function (depot) {
                    UserService.assignDepotToUser(userId, depot).then(function (response) {
                        console.log(response.data);
                    });
                    updateView();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        user.changePassword = function (oldPassword, newPassword, repeatNewPassword, ev) {
            if (newPassword === repeatNewPassword) {
                UserService.changePassword(oldPassword, newPassword).then(function () {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Success!')
                            .textContent("Successfully changed password!")
                            .ariaLabel('changed passwords')
                            .ok('OK, great!')
                            .targetEvent(ev)
                    );


                }, function (error) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Error!')
                            .textContent("You did not correct old password!")
                            .ariaLabel('Wrong passwords')
                            .ok('OK, I\'ll enter correct old password now...')
                            .targetEvent(ev)
                    );
                });
            }
            else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Error!')
                        .textContent("You did not enter same password twice!")
                        .ariaLabel('Wrong passwords')
                        .ok('OK, I\'ll enter the same password twice now...')
                        .targetEvent(ev)
                );
            }
        };

        user.register = function (event,user) {
            UserService.register(user).then(function (response) {
                UserService.login(user).then(function (response) {
                    MessageService.showDialogMessage("You have successfully registered a user. However, you need to assign a depot the user before the user can login.",event);
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


        user.changeEmail = function (newEmail, repeatNewEmail, ev) {

            if (newEmail === repeatNewEmail) {
                UserService.changeEmail(newEmail).then(function () {
                    UserService.getUserByName(UserService.user.username).then(function (response) {
                        user.email = response.data.email;
                    });
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Success!')
                            .textContent("Successfully changed email!")
                            .ariaLabel('changed email')
                            .ok('OK, great!')
                            .targetEvent(ev)
                    );
                });
            }

            else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Error!')
                        .textContent("You did not enter same email twice.")
                        .ariaLabel('Wrong email')
                        .ok('OK, I\'ll enter correct email now...')
                        .targetEvent(ev)
                );
            }

        };

        user.login = function () {

            UserService.login(user).then(function (response) {
                console.log(response.data)
            });
        };

        user.setAdmin = function () {
            UserService.setAdmin(true);
        };

        user.isAdmin = UserService.isAdmin;


    }]);


function DepotSelectionController($scope, $mdDialog, DepotService) {

    $scope.init = function () {
        DepotService.getDepots().then(function (response) {
            $scope.depots = response.data;
        });
    };
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.assignDepot = function (depot) {
        $mdDialog.hide(depot);
    };
}