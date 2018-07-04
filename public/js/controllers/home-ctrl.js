/*function homeCtrl($rootScope, $scope, httpService, appConstant, checkAllowedStates, tokenService, $filter, displayTabs) {
    console.log('homeCtrl');
    
    let home = this;
    home.$onInit = function() {
        let requestParams = {
            url: appConstant.getUser.apiUrl,
            method: appConstant.getUser.apiMethod
        };
        httpService.ajaxCall(requestParams).then((resData) => {
            if (resData.status) {
                home.userList = resData.data;
            } else {
                home.errMessage = appConstant.errMessage;
            }
        })
    }

}*/

class Home{
	constructor(appConstant, httpService){
		this.appConstant = appConstant;
		this.httpService = httpService;
	}

	$onInit() {
        console.log('homee');
      let requestParams = {
            url: this.appConstant.getUser.apiUrl,
            method: this.appConstant.getUser.apiMethod
        };
        
        this.httpService.ajaxCall(requestParams).then((resData) => {
            if (resData.status) {
                this.userList = resData.data;
            } else {
                this.errMessage = appConstant.errMessage;
            }
        })
    }
}

Home.$inject = ['appConstant', 'httpService'];

angular.module('homeCtrlModule', [])
    //.controller('homeCtrl', homeCtrl)
    .component('home', {
        controller: Home,
        templateUrl: '../templates/home.html'
    })