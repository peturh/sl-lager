var app = require('app');

app.controller('CategoryController', ['$scope','CategoryService',
    function ($scope, CategoryService) {
        var category = this;

        category.init = function(){
            CategoryService.getCategories().then(function(response){
                category.categories = response.data;
            })
        }

    }]);



function AddNewCategoryController($scope, $mdDialog, CategoryService) {

    $scope.category = {
        name: "",
        location: ""
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.addNewDepot = function () {
        DepotService.addNewDepot($scope.depot).then(function () {
            $mdDialog.hide();
        })
    };

}