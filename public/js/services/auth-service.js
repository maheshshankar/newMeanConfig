function AuthService($state, tokenService, appConstant){
	let auth = {};
		auth.checkAuth = function(){
			appConstant.appStates.some(state => {
				if(!tokenService.getToken() && !state.isAllowed){
					console.log(state);
					$state.go('main.login');
					return state;
				}else{
					$state.go('main.index');
				}
			})
			
		}
	return auth;
}

AuthService.$inject = ['$state', 'tokenService', 'appConstant'];

angular.module('AuthServiceModule', [])
	.factory('AuthService', AuthService)

