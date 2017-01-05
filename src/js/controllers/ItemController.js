var app = require('app');

app.controller('ItemController', ['$scope','ItemService','MessageService','$state', '$stateParams',
    function ($scope, ItemService, MessageService,$state,$stateParams) {
        var itemCtrl = this;

        itemCtrl.init = function(){
           updateView(function(){
                if($state.params.id){
                    for(var i = 0; i<itemCtrl.items.length; i++){
                        if($state.params.id === itemCtrl.items[i]._id){
                            itemCtrl.selectedItem = itemCtrl.items[i];

                        }
                    }
                }
           });
        };
        itemCtrl.selectItem = function (item) {
            itemCtrl.selectedItem = item;
            $state.params.id = itemCtrl.selectedItem._id;
            $state.go('items',{id:itemCtrl.selectedItem._id});
        };

        itemCtrl.saveUpdatedItem = function () {
            ItemService.updateItem(itemCtrl.selectedItem, $stateParams.id).then(function () {
                MessageService.showToastMessage('Successfully saved updated item.');
                updateView();
            });
        };

        itemCtrl.deleteItem = function(ev){
            MessageService.showConfirmMessage('Are you sure you want to totally delete this item?',ev,function(confirm){
                if(confirm){
                    ItemService.deleteItem(itemCtrl.selectedItem).then(function(){
                        MessageService.showToastMessage('Successfully deleted item.');
                        updateView();
                        itemCtrl.selectedItem = '';
                    })
                }
            })

        };

        function updateView(callback){
            ItemService.getItems().then(function(response){
                itemCtrl.items = response.data;
                callback();
            })
        }

    }]);