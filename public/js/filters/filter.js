function filterStates(){
	return function(item){
		console.log('FILTERRERE - ',item);
	}
}

filterStates = [];

angular.module('filterStatesModule', [])
		.filter('filterStates',filterStates)