var app = require('app');

app.controller('DepotController', ['$scope','$state', 'DepotService','ItemService','$stateParams',
    function ($scope,$state, DepotService,ItemService,$stateParams) {
        var depot = this;

        /**
         * The init function - Get available sites to present to the user
         */
        depot.init = function () {
            DepotService.getDepot($stateParams.id).then(function(response){
                depot.depot = response.data[0];
            })
        };
        depot.selectItem = function(){

        };

        depot.addItem = function(){
            DepotService.addItem
        }

    }]);