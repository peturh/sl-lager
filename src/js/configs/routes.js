/**
 * Since this is a small project, this file isn't really needed, but for future requirements maybe.
 *
 */

var app = require('app');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
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

}]);
