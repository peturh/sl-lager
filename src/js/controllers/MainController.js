var app = require('app');

app.controller('MainController', ['$scope', 'DepotService', '$mdSidenav', '$state', '$mdDialog','MessageService','UserService',
    function ($scope, DepotService, $mdSidenav, $state, $mdDialog,MessageService,UserService) {
        var main = this;

        /**
         * The init function - Get available sites to present to the user
         */
        main.init = function () {
            updateView();
        };

        main.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        main.selectDepot = function (id) {
            $state.go('depot', {id: id});
        };

        main.openLink = function (link) {
            $state.go(link);
            $mdSidenav("left").toggle();
        };

        main.isLoggedIn = function () {
            return UserService.user;
        };

        main.isAdmin = function () {
            return UserService.admin;
        };

        main.logout = function (event) {
            UserService.logout().then(function () {
                MessageService.showDialogMessage("Logged out!", event);
                UserService.user = null;
                UserService.admin = null;
                $state.go('login');
            });
        };

        main.editDepot = function(depot){
            main.selectedDepot = depot;
        };

        main.saveUpdatedDepot = function(){
            DepotService.updateDepot(main.selectedDepot).then(function(){
                updateView();
            })
        };

        main.deleteDepot = function(){
            console.log(main.selectedDepot);
            DepotService.deleteDepot(main.selectedDepot).then(function(){
                updateView();
                main.selectedDepot = '';
                MessageService.showToastMessage('Successfully deleted depot');
            })
        };

        function updateView() {
            DepotService.getDepots().then(function (response) {
                main.depots = response.data;
            })
        }

        main.addDepot = function (ev) {
            $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'DepotService', AddNewDepotController],
                    templateUrl: 'addDepot.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                .then(function (screenId) {
                    updateView();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });

        };


    }]);


function AddNewDepotController($scope, $mdDialog, DepotService) {

    $scope.depot = {
        name: "",
        location: ""
    };

    $scope.init = function () {

    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.addNewDepot = function () {
        DepotService.addNewDepot($scope.depot).then(function () {
            $mdDialog.hide();
        })
    };

}