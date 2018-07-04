function loginCtrl(http, state, tokenService, httpService, Notification, appConstant, displayTabs) {
    console.log('loginCtrl');
    //checkAllowedStates.checkStates();
    this.userLogin = function() {
        console.log('userr - ', this.user);
        if (this.user.name && this.user.password) {
            let requestParams = {
                url: appConstant.login.apiUrl,
                method: appConstant.login.method,
                data: this.user
            }
            httpService.ajaxCall(requestParams).then((resData) => {
                if (resData.status && resData.successMessage) {
                    tokenService.setToken(resData.tokenkey);
                    Notification.success({
                        message: '<center>' + resData.successMessage + '</center>',
                        delay: 1000,
                        onClose: function() {
                            if(tokenService.getToken()){
                                state.go('main.index');
                            }
                        }
                    });

                } else {
                    Notification.error({
                        message: '<center>' + resData.errorMessage + '</center>',
                        delay: 2000
                    });
                }
            }, (err) => {
                Notification.error({
                        message: '<center>' + err.message + '</center>',
                        delay: 2000
                    });
            })
        }
    };
}

loginCtrl.$inject = ['$http', '$state', 'tokenService', 'httpService', 'Notification', 'appConstant', 'displayTabs'];

angular.module('loginCtrlModule', [])
    .component('login', {
        controller: loginCtrl,
        templateUrl: '../templates/login.html'
    })
