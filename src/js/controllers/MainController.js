var app = require('app');

app.controller('MainController', ['$scope', 'DepotService','$mdSidenav','$state',
    function ($scope, DepotService,$mdSidenav,$state) {
        var main = this;

        /**
         * The init function - Get available sites to present to the user
         */
        main.init = function () {
            DepotService.getDepots().then(function(response){
                main.depots = response.data;
            })
        };

        main.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        main.selectDepot = function(id){
            $state.go('depot',{id : id});
        };

    }]);