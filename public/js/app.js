angular.module('myApp', ['ui.router',
        'angular-storage',
        'ui-notification',
        'mainCtrlModule',
        'constantServiceModule',
        'apiInterceptorModule',
        'checkAllowedStatesService',
        'displayTabsModule',
        'AuthServiceModule'
    ])
    .config(['$compileProvider', '$stateProvider', '$urlRouterProvider', 'NotificationProvider', '$httpProvider', function($compileProvider, $stateProvider, $urlRouterProvider, NotificationProvider, httpProvider) {
        $compileProvider.preAssignBindingsEnabled(true);

        $stateProvider
            .state('main', {
                url: '/main',
                component: 'main',
                resolve: {
                    navTabs: ['$rootScope', 'displayTabs', function($rootScope, displayTabs) {
                        $rootScope.$broadcast('tabs', displayTabs.getTabs());
                        return displayTabs.getTabs();
                    }],
                }
            })
            .state('main.index', {
                url: '/index',
                component: 'home',
                resolve: {
                    checkUserAuth: ['$state', 'AuthService', function($state, AuthService) {
                        AuthService.checkAuth();
                    }],
                    navTabs: ['$rootScope', 'displayTabs', function($rootScope, displayTabs) {
                        $rootScope.$broadcast('tabs', displayTabs.getTabs());
                        return displayTabs.getTabs();
                    }]
                }
            })
            .state('main.register', {
                url: '/register',
                component: 'register',
                resolve: {
                    /*checkUserAuth: ['$state', 'AuthService', function($state, AuthService) {
                        AuthService.checkAuth()
                    }]*/
                }
            })
            .state('main.login', {
                url: '/login',
                component: 'login',
                resolve: {
                    navTabs: ['$rootScope', 'displayTabs', function($rootScope, displayTabs) {
                        $rootScope.$broadcast('tabs', displayTabs.getTabs());
                        return displayTabs.getTabs();
                    }],
                    checkUserAuth: ['$state', 'AuthService', function($state, AuthService) {
                        AuthService.checkAuth();
                    }]
                }
            })
            .state('main.chat', {
                url: '/chat',
                component: 'chat',
                /*resolve: {
                   checkUserAuth: ['$state', 'AuthService', function($state, AuthService) {
                        AuthService.checkAuth();
                    }]
                }*/
            })

        $urlRouterProvider.otherwise('main/index');

        httpProvider.interceptors.push(apiInterceptor);

        NotificationProvider.setOptions({
            delay: 2000,
            startTop: 220,
            startRight: 450,
            verticalSpacing: 100,
            horizontalSpacing: 120,
            positionX: 'left',
            positionY: 'top'
        });
    }])

    .factory("$exceptionHandler", ['$log', function($log) {
        return function(exception, cause) {
            $log.warn(exception.message);
        }
    }])