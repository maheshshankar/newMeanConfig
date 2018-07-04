(function(){

	const jwt = require('jsonwebtoken');
	const appSecretKey = 'chatSecretKey';

	function generateToken(user){
		if(user){
			return jwt.sign({name: user.name}, appSecretKey, {expiresIn: '2m'} );
		}
	}

	function verifyToken(token){
		return jwt.verify(token, appSecretKey);
	}

	module.exports = { generateToken, verifyToken };

})()