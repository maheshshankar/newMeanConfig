function tokenService(store, $state) {
    let service = {};

    service.setToken = function(token) {
        return store.set('access_token', token);
    }

    service.getToken = function() {
        if (store.get('access_token')) {
            return store.get('access_token');
        } else {
            service.removeToken();
        }
    }

    service.removeToken = function() {
        if (store.get('access_token')) {
            store.remove('access_token')
            //$state.go('main.login');
            return false;
        } else {
            return true;
        }
    }

    return service;
}

tokenService.$inject = ['store', '$state'];

angular.module('tokenServiceModule', [])
    .factory('tokenService', tokenService)