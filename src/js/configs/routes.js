/**
 * Since this is a small project, this file isn't really needed, but for future requirements maybe.
 *
 */

var app = require('app');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //
    // Now set up the states
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .state('depot', {
            url: '/depot/:id',
            templateUrl: 'depot.html',
            controller: 'DepotController',
            controllerAs: 'depot'
        })
        .state('items', {
            url: '/items/',
            templateUrl: 'item.html',
            controller: 'ItemController',
            controllerAs: 'itemCtrl'
        })
        .state('categories', {
            url: '/categories/',
            templateUrl: 'category.html',
            controller: 'CategoryController',
            controllerAs: 'category'
        })

}]);
