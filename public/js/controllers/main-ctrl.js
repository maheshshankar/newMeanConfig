
function Main($rootScope){
    this.$onInit = () => {
         $rootScope.$on('tabs', (args, data) => {
            this.navTabs = data;
        });
    }
   
    this.logout = () => {
        console.log('Clickedd - ');
    }
}
Main.$inject = ['$rootScope'];

angular.module('mainCtrlModule', ['registerCtrlModule',
        'loginCtrlModule',
        'homeCtrlModule',
        'tokenServiceModule',
        'httpServiceModule',
        'chatCtrlModule',
        'displayTabsModule'
    ])
    //.controller('mainCtrl', mainCtrl);
    .component('main', {
        controller: Main,
        templateUrl: '../templates/mainn.html',
        bindings: {
          navTabs: '<',
        }
    })