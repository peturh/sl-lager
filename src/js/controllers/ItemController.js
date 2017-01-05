var app = require('app');

app.controller('ItemController', ['$scope', 'ItemService', 'MessageService', '$state', '$stateParams',
    function ($scope, ItemService, MessageService, $state, $stateParams) {
        var itemCtrl = this;

        itemCtrl.init = function () {
            updateView(function () {
                if ($state.params.id) {
                    for (var i = 0; i < itemCtrl.items.length; i++) {
                        if ($state.params.id === itemCtrl.items[i]._id) {
                            itemCtrl.selectedItem = itemCtrl.items[i];
                            ItemService.getDepotsWithItem(itemCtrl.selectedItem).then(function (response) {
                                console.log(response.data);
                                itemCtrl.depots = response.data;
                                for (var i = 0; i < itemCtrl.depots.length; i++) {
                                    for (var j = 0; j < itemCtrl.depots[i].itemsAndQuantity.length; j++) {
                                        if(itemCtrl.depots[i].itemsAndQuantity[j].item === $state.params.id){
                                            itemCtrl.depots[i].quantityInDepot = itemCtrl.depots[i].itemsAndQuantity[j].depotQuantity;
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            });

        };
        itemCtrl.selectItem = function (item) {
            itemCtrl.selectedItem = item;
            $state.params.id = itemCtrl.selectedItem._id;
            $state.go('items', {id: itemCtrl.selectedItem._id});

            ItemService.getDepotsWithItem(itemCtrl.selectedItem).then(function (response) {
                itemCtrl.depots = response.data;
                for (var i = 0; i < itemCtrl.depots.length; i++) {
                    for (var j = 0; j < itemCtrl.depots[i].itemsAndQuantity.length; j++) {
                        if(itemCtrl.depots[i].itemsAndQuantity[j].item === $state.params.id){
                            itemCtrl.depots[i].quantityInDepot = itemCtrl.depots[i].itemsAndQuantity[j].depotQuantity;
                        }
                    }
                }
            })

        };

        itemCtrl.saveUpdatedItem = function () {
            ItemService.updateItem(itemCtrl.selectedItem, $stateParams.id).then(function () {
                MessageService.showToastMessage('Successfully saved updated item.');
                updateView(function () {
                });
            });
        };

        itemCtrl.deleteItem = function (ev) {
            MessageService.showConfirmMessage('Are you sure you want to totally delete this item?', ev, function (confirm) {
                if (confirm) {
                    ItemService.deleteItem(itemCtrl.selectedItem).then(function () {
                        MessageService.showToastMessage('Successfully deleted item.');
                        updateView(function () {
                        });
                        itemCtrl.selectedItem = '';
                    })
                }
            })

        };

        itemCtrl.goToDepot = function (id) {
            $state.go('depot', {id: id});
        };

        function updateView(callback) {
            ItemService.getItems().then(function (response) {
                itemCtrl.items = response.data;
                callback();
            })
        }

    }]);