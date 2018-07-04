function apiInterceptor(tokenService, checkAllowedStates, appConstant, $state) {
    let interceptor = {
        request: function(config) {
            //console.log(config);
            config.headers.authorization = tokenService.getToken();
            //let checkStateStatus = appConstant.appStates;
            /*checkStateStatus.filter(function(state){
                if(state.url.indexOf(config.url) === -1){
                    config.headers.authorization = tokenService.getToken();
                }
                return state;
            })*/
            return config;
        },
        responseError: function(resErr) {
            if (resErr.status === 401) {
                tokenService.removeToken();
                $state.go('main.login')
            }
            return resErr;
        }
    };
    return interceptor;
}

apiInterceptor.$inject = ['tokenService', 'checkAllowedStates', 'appConstant', '$state'];

angular.module('apiInterceptorModule', [])
    .factory('apiInterceptor', apiInterceptor)