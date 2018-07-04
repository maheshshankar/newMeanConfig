
function registerCtrl(){
	console.log('REG CTRL');
	let reg = this;
	reg.checkSubmit = false;
	reg.signUp = function(form){
		reg.checkSubmit = true;
		if(form.$valid){
			console.log('Submiteddd', reg.register);
		}
	}
}

registerCtrl.$inject = [];

angular.module('registerCtrlModule',[])
	.component('register', {
		controller: registerCtrl,
		templateUrl: '../templates/register.html'
	})
