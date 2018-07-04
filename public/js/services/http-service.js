function httpService(http, q) {
	this.ajaxCall = function(requestParams){
		let defer = q.defer();
		http(requestParams)
			.then((resData) => {
				if(resData && resData.status === 200){
					defer.resolve(resData.data);
				}				
			}, (err)=>{
				defer.reject(err);
			})
		return defer.promise;
	}
}

httpService.$inject = ['$http', '$q'];

angular.module('httpServiceModule', [])
	.service('httpService', httpService)