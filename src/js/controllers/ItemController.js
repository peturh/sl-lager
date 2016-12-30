var app = require('app');

app.controller('ItemController', ['$scope','ItemService','MessageService',
    function ($scope, ItemService, MessageService) {
        var itemCtrl = this;

        itemCtrl.init = function(){
           updateView();
        };
        itemCtrl.selectItem = function (item) {
            console.log("item",item)
            itemCtrl.selectedItem = item;
            console.log("WAH",itemCtrl.selectedItem);
        };

        itemCtrl.saveUpdatedItem = function () {
            ItemService.updateItem(itemCtrl.selectedItem, $stateParams.id).then(function () {
                MessageService.showToastMessage('Successfully saved updated item.');
                updateView();
            });
        };
        function updateView(){
            ItemService.getItems().then(function(response){
                itemCtrl.items = response.data;
            })
        }

    }]);