var app = require('app');

app.controller('DepotController', ['$scope', '$state', 'DepotService', 'ItemService', '$stateParams', '$mdDialog', '$mdMedia',
    function ($scope, $state, DepotService, ItemService, $stateParams, $mdDialog, $mdMedia) {
        var depot = this;

        /**
         * The init function - Get available sites to present to the user
         */
        depot.init = function () {
            DepotService.getDepot($stateParams.id).then(function (response) {
                depot.depot = response.data[0];
            })
        };
        depot.selectItem = function () {

        };

        depot.addItem = function (ev) {
            $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'ItemService','$stateParams', DialogController],
                    templateUrl: 'addItem.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                .then(function (screenId) {

                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });

        }

    }]);


function DialogController($scope, $mdDialog, ItemService, $stateParams) {

    $scope.item = {
        name: "",
        description: "",
        category: "",
        quantity : ""
    };

    $scope.init = function () {

    };
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.addExistingItem = function () {
        ItemService.addExistingItemToDepot($scope.item,$stateParams.id).then(function () {
            $mdDialog.hide();
        })
    };
    $scope.addNewItem = function (close) {
        ItemService.addNewItemToDepot($scope.item,$stateParams.id).then(function () {
            if (close) {
                $mdDialog.hide();
            }
            else {
                /*$scope.item = {
                    name: "",
                    description: "",
                    category: "",
                    quantity : ""
                };*/
            }
        })
    };
}