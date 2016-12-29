var app = require('app');

app.controller('DepotController', ['$scope', '$state', 'DepotService', 'ItemService', '$stateParams', '$mdDialog', '$mdMedia', 'MessageService',
    function ($scope, $state, DepotService, ItemService, $stateParams, $mdDialog, $mdMedia, MessageService) {
        var depot = this;

        /**
         * The init function - Get available sites to present to the user
         */
        depot.selectedItem = '';
        depot.init = function () {
            updateView();
        };
        depot.selectItem = function (item) {
            depot.originalDepotQuantity = angular.copy(item.depotQuantity);
            depot.originalTotalQuantity = angular.copy(item.item.quantity);
            depot.selectedItem = item;
            console.log(depot.selectedItem);
        };

        depot.updateTotalQuantity = function () {
            depot.selectedItem.item.quantity = depot.originalTotalQuantity - (depot.originalDepotQuantity - depot.selectedItem.depotQuantity);
        };

        depot.saveUpdatedItem = function () {
            DepotService.updateItemInDepot(depot.selectedItem, $stateParams.id).then(function () {
                MessageService.showToastMessage('Successfully saved updated item.');
                updateView();
            });
        };

        depot.addItem = function (ev) {
            $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'ItemService', 'DepotService', '$stateParams', AddNewItemController],
                    templateUrl: 'addItem.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                .then(function () {
                    updateView();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });

        };

        function updateView() {
            DepotService.getDepot($stateParams.id).then(function (response) {
                depot.depot = response.data[0];
            })
        }
    }]);


function AddNewItemController($scope, $mdDialog, ItemService, DepotService, $stateParams) {

    $scope.item = {
        name: "",
        description: "",
        category: "",
        quantity: ""
    };

    $scope.selectedItem = "";

    $scope.init = function () {
        ItemService.getItems().then(function (response) {
            $scope.items = response.data;
            console.log($scope.items);
        });
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.selectItem = function (item) {
        $scope.selectedItem = item;
        console.log($scope.selectedItem);
    };

    $scope.addExistingItem = function (close) {
        console.log($scope.selectedItem.quantity);
        console.log($scope.selectedItem.depotQuantity);
        $scope.selectedItem.quantity = $scope.selectedItem.quantity + $scope.selectedItem.depotQuantity;
        console.log($scope.selectedItem);
        ItemService.addExistingItemToDepot($scope.selectedItem, $stateParams.id).then(function () {
            if (close) {
                $mdDialog.hide();
            }
            else {
                $scope.selectedItem = "";
            }
        })
    };

    $scope.addNewItem = function (close) {
        ItemService.addNewItemToDepot($scope.item, $stateParams.id).then(function () {
            if (close) {
                $mdDialog.hide();
            }
            else {
                $scope.item = {
                    name: "",
                    description: "",
                    category: "",
                    quantity: ""
                };
            }
        })
    };
}