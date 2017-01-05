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
        .state('depot.item',{
            url: '/item/:itemId',
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
        });


    /**
     * Add this for authentication later

     */
    function alreadyLoggedIn($q, UserService, $state, $timeout) {
        UserService.getLoginStatus().then(function () {

            if (UserService.user) {
                $timeout(function () {
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    $state.go('screen', {screenId: UserService.user.screen.id});
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
                console.log("is user");
                return $q.when();
            } else {
                console.log("not user");

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
                console.log("is admin");
                return $q.when()
            } else {
                console.log("not admin", $state);

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
