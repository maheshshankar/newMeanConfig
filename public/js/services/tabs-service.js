function displayTabs($rootScope, tokenService, appConstant, $filter) {
    this.getTabs = () => {
        let accessToken = tokenService.getToken();
        let states = appConstant.appStates;
        let filteredTabs;
        if (angular.isDefined(accessToken)) {
            filteredTabs = $filter('filter')(states, { isAllowed: true })
        } else {
            filteredTabs = $filter('filter')(states, { isAllowed: false })
        }
        if (filteredTabs) {
            $rootScope.$emit('tabs', filteredTabs);
            return filteredTabs;
        }
    }
}

displayTabs.$inject = ['$rootScope', 'tokenService', 'appConstant', '$filter'];

angular.module('displayTabsModule', [])
    .service('displayTabs', displayTabs);