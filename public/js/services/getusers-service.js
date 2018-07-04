function getUser(){
	let user = {};

	user.getUsers = function(){
		
	}

	return user;
}

getUser.$inject = [];

angular.module('getUserServiceModule', [])
	.factory('getUser', getUser)