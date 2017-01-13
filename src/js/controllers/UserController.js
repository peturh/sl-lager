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

        user.oldPassword = "";
        user.newPassword = "";
        user.repeatNewPassword = "";

        user.init = function () {
            UserService.getLoginStatus().then(function (response) {

                    user.email = response.data.email;

                }
            )

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