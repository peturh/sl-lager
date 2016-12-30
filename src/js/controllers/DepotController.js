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
                if (depot.selectedItem !== '') {
                    for (var i = 0; i < depot.depot.itemsAndQuantity.length; i++) {
                        if (depot.depot.itemsAndQuantity[i].item._id === depot.selectedItem.item._id) {
                            depot.selectedItem = depot.depot.itemsAndQuantity[i];
                            break;
                        }
                    }
                }
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
        $scope.items = [];
        //Get all the items that does NOT exist in depot already
        ItemService.getItems().then(function (response) {
            var allItems = response.data;
            DepotService.getDepot($stateParams.id).then(function (response) {
                var depotItems = response.data[0].itemsAndQuantity;
                if (depotItems.length === 0) {
                    $scope.items = allItems;
                }
                else {


                    for (var i = 0; i < allItems.length; i++) {
                        for (var j = 0; j < depotItems.length; j++) {
                            if (allItems[i]._id !== depotItems[j].item._id) {
                                $scope.items.push(allItems[i]);
                            }
                        }
                    }
                }

            })

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