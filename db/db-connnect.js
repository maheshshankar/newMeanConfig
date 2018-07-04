(function(){
	let mongoose = require('mongoose');

	function dbConnection(app){
		mongoose.connect('mongodb://localhost/mean', (err) =>{
			if(err){
				console.log('DB Connection Failed');
			}else{
				console.log('DB connected');
			}
		})
	}
	module.exports = dbConnection;
})()




