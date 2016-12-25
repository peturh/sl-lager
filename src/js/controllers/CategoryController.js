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