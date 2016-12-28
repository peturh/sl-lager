var app = require('app');

app.controller('DepotController', ['$scope', '$state', 'DepotService', 'ItemService', '$stateParams', '$mdDialog', '$mdMedia','MessageService',
    function ($scope, $state, DepotService, ItemService, $stateParams, $mdDialog, $mdMedia,MessageService) {
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

        depot.updateTotalQuantity = function(){
            depot.selectedItem.item.quantity = depot.originalTotalQuantity - (depot.originalDepotQuantity - depot.selectedItem.depotQuantity);
        };

        depot.saveUpdatedItem = function(){
            DepotService.updateItemInDepot(depot.selectedItem,$stateParams.id).then(function(){
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
                .then(function (screenId) {
                    updateView();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });

        };

        function updateView(){
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

    $scope.init = function () {
        DepotService.getDepot($stateParams.id).then(function(response){
           $scope.items = response.data;
        });
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.addExistingItem = function () {
        ItemService.addExistingItemToDepot($scope.item, $stateParams.id).then(function () {
            $mdDialog.hide();
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