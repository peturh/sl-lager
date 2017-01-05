var app = require('app');

app.controller('CategoryController', ['$scope','CategoryService','$mdDialog',
    function ($scope, CategoryService,$mdDialog) {
        var category = this;

        category.init = function(){
            CategoryService.getCategories().then(function(response){
                category.categories = response.data;
            })
        };

        category.addCategory = function (ev) {
            $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'CategoryService', '$stateParams', AddNewCategoryController],
                    templateUrl: 'addCategory.html',
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

        function updateView(){
            CategoryService.getCategories().then(function(response){
                category.categories = response.data;
            })
        };

    }]);



function AddNewCategoryController($scope, $mdDialog, CategoryService) {

    $scope.category = {
        name: "",
        description: ""
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.addNewCategory = function () {
        CategoryService.addNewCategory($scope.category).then(function () {
            $mdDialog.hide();
        })
    };

}