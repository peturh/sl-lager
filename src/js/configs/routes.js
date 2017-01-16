/**
 * Since this is a small project, this file isn't really needed, but for future requirements maybe.
 *
 */

var app = require('app');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    // Now set up the states
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'main.html',
            controller: 'MainController',
            controllerAs: 'main',
            resolve : {
                authenticate :['$q', 'UserService', '$state', '$timeout', authenticateAdmin]
            }
        })
        .state('depot', {
            url: '/depot/:id',
            templateUrl: 'depot.html',
            controller: 'DepotController',
            controllerAs: 'depot',
            resolve: {
                authenticate: ['$q', 'UserService', '$state', '$timeout', authenticateUser]
            }
        })
        .state('depot.item',{
            url: '/item/:itemId',
            templateUrl: 'depot.html',
            controller: 'DepotController',
            controllerAs: 'depot',
            resolve: {
                authenticate: ['$q', 'UserService', '$state', '$timeout', authenticateUser]
            }
        })
        .state('items', {
            url: '/items/:id',
            templateUrl: 'item.html',
            controller: 'ItemController',
            controllerAs: 'itemCtrl',
            resolve : {
                authenticate :['$q', 'UserService', '$state', '$timeout', authenticateAdmin]
            }
        })/*
        .state('categories', {
            url: '/categories/',
            templateUrl: 'category.html',
            controller: 'CategoryController',
            controllerAs: 'category'
        })*/
        .state('settings', {
            url: '/settings',
            templateUrl: 'userSettings.html',
            controller: 'UserController',
            controllerAs: 'user',
            resolve: {
                authenticate: ['$q', 'UserService', '$state', '$timeout', authenticateUser]
            }

        })

        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginController',
            controllerAs: 'login',
            resolve: {
                authenticate: ['$q', 'UserService', '$state', '$timeout', alreadyLoggedIn]
            }
        });
    ;


    /**
     * Add this for authentication later

     */
    function alreadyLoggedIn($q, UserService, $state, $timeout) {
        UserService.getLoginStatus().then(function () {

            if (UserService.user) {
                $timeout(function () {
                    $state.go('depot', {id: UserService.user.depot});
                });
                return $q.reject()
            }
            else {
                return $q.when();
            }
        });

    }

    function authenticateUser($q, UserService, $state, $timeout) {

        UserService.getLoginStatus().then(function () {
            if (UserService.user) {
                return $q.when();
            } else {

                $timeout(function () {
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    $state.go('login')
                });
                return $q.reject()

            }
        });

    }

    function authenticateAdmin($q, UserService, $state, $timeout) {

        UserService.getLoginStatus().then(function () {
            if (UserService.admin) {
                return $q.when()
            } else {
                $timeout(function () {
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    $state.go('login')
                });
                return $q.reject()

            }
        });


    }

}]);
