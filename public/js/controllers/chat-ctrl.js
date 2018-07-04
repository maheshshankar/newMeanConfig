function chatCtrl(){
	console.log('Chat Ctrl');
	let Socket = io.connect();
	//this.allMessages = [];
	this.getMsg = () => {
		socket = io();
		socket.emit('message', this.chatMsg);
		socket.on('back', (msgData) => {
			// console.log(msgData);
			this.allMessages = msgData;
		})
	}
}
chatCtrl.$inject = [];

angular.module('chatCtrlModule', [])
	.component('chat', {
		controller: chatCtrl,
		templateUrl: '../templates/chat.html'
	})
	