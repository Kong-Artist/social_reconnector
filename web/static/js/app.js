var app = angular.module("app", ["ui.router"]);

app.config(
    ["stateProvider", "urlProvider", "locationProvider", "logProvider"],
    function($stateProvider, $urlProvider, $locationProvider, $logProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                template: '<h3>home</h3>'
            })
            .state('friends', {
                url: '/friends',
                template: '<h3>friends</h3>'
            });

        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true);
    }
);
