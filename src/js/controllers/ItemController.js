var app = require('app');

app.controller('ItemController', ['$scope','ItemService',
    function ($scope, ItemService) {
        var item = this;

        item.init = function(){
            ItemService.getItems().then(function(response){
                item.items = response.data;
            })
        };

    }]);