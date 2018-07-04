function checkAllowedStates(tokenService, appConstant) {
    let allowedStates = {};

    allowedStates.checkStates = function(){
    	let filterr = checkStateStatus.filter(function(state){
                if(!state.isAllowed && (config.url === state.url) && tokenService.getToken()){
                    return state;
                }
            })
    };

    return allowedStates;
}

checkAllowedStates.$inject = ['tokenService', 'appConstant'];

angular.module('checkAllowedStatesService', [])
    .factory('checkAllowedStates', checkAllowedStates)