var app = require('app');
var _ = require('underscore');

app.controller('DepotController', ['$scope', '$state', 'DepotService', 'ItemService', '$stateParams', '$mdDialog', '$mdMedia', 'MessageService',
    function ($scope, $state, DepotService, ItemService, $stateParams, $mdDialog, $mdMedia, MessageService) {
        var depot = this;

        /**
         * The init function - Get available sites to present to the user
         */
        depot.selectedItem = '';
        depot.init = function () {
            updateView(function () {
                if ($state.params.itemId) {
                    for (var i = 0; i < depot.depot.itemsAndQuantity.length; i++) {
                        if (depot.depot.itemsAndQuantity[i]._id === $state.params.itemId) {
                            chooseItem(depot.depot.itemsAndQuantity[i])
                            break;
                        }
                    }
                }
            });
        };

        function chooseItem(item) {
            depot.originalDepotQuantity = angular.copy(item.depotQuantity);
            depot.originalTotalQuantity = angular.copy(item.item.quantity);
            depot.selectedItem = item;
        }

        depot.selectItem = function (item) {
            chooseItem(item);
            $state.go('depot.item', {itemId: depot.selectedItem._id});
        };

        depot.updateTotalQuantity = function () {
            if (typeof depot.selectedItem.depotQuantity !== 'undefined') {
                depot.selectedItem.item.quantity = depot.originalTotalQuantity - (depot.originalDepotQuantity - depot.selectedItem.depotQuantity);
            }
        };

        depot.saveUpdatedItem = function () {
            if(depot.selectedItem.depotQuantity == null){
                depot.selectedItem.depotQuantity = 0;
                DepotService.updateItemInDepot(depot.selectedItem, $stateParams.id).then(function () {
                    MessageService.showToastMessage('Successfully saved updated item.');
                    updateView(function () {
                    });
                });
            }

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
                    updateView(function () {
                    });
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });

        };

        depot.deleteItem = function (ev) {
            if (depot.selectedItem.depotQuantity === null) {
                depot.selectedItem.depotQuantity = 0;
            }

            DepotService.updateItemInDepot(depot.selectedItem, $stateParams.id).then(function () {
                MessageService.showConfirmMessage('Are you sure you want to delete this item from the depot?', ev, function (deleteItem) {
                    if (deleteItem) {
                        DepotService.deleteItem(depot.selectedItem, $stateParams.id).then(function () {
                            MessageService.showToastMessage('Successfully deleted item.');
                            updateView(function () {
                            });
                            depot.selectedItem = '';
                        })
                    }
                })
            })

        };

        function updateView(callback) {
            DepotService.getDepot($stateParams.id).then(function (response) {
                depot.depot = response.data[0];
                if (depot.selectedItem !== '') {
                    for (var i = 0; i < depot.depot.itemsAndQuantity.length; i++) {
                        if (depot.depot.itemsAndQuantity[i].item._id === depot.selectedItem.item._id) {
                            depot.selectedItem = depot.depot.itemsAndQuantity[i];
                            callback();
                        }
                    }
                }
                callback();
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
        //Get all the items that does NOT exist in depot already
        updateItems();
    };

    function updateItems() {
        $scope.items = [];

        ItemService.getItems().then(function (response) {
            var allItems = response.data;
            DepotService.getDepot($stateParams.id).then(function (response) {
                var depotItems = response.data[0].itemsAndQuantity;
                if (depotItems.length === 0) {
                    console.log("No items in depot, adding all");
                    $scope.items = allItems;
                }
                else {
                    var allItemsIdTempArray = [];
                    var depotTempIdArray = [];
                    for (var j = 0; j < allItems.length; j++) {
                        allItemsIdTempArray.push(allItems[j]._id)
                    }
                    for (var i = 0; i < depotItems.length; i++) {
                        depotTempIdArray.push(depotItems[i].item._id);
                    }
                    var exclusive = _.difference(allItemsIdTempArray, depotTempIdArray);

                    for (var l = 0; l < exclusive.length; l++) {
                        for (var k = 0; k < allItems.length; k++) {
                            if (exclusive[l] === allItems[k]._id) {
                                $scope.items.push(allItems[k]);
                            }
                        }
                    }
                }

            })
        });
    }

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
        ItemService.addExistingItemToDepot($scope.selectedItem, $stateParams.id).then(function () {
            if (close) {
                $mdDialog.hide();
            }
            else {
                updateItems();
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