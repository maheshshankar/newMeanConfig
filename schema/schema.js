(function() {
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt-nodejs');
    const Schema = mongoose.Schema;
    const User = new Schema({
        name: String,
        email: String,
        password: String
    })

    User.pre('save', function(next) {
        var newUser = this;
        bcrypt.hash(newUser.password, null, null, function(err, newPassword) {
            if (err) throw err.message;
            newUser.password = newPassword;
            next();
        });
    });

    User.methods.comparePassword = function(password){
    	let userPassword = this;
    	return bcrypt.compareSync(password, userPassword.password);
    }

    module.exports = mongoose.model('chatUser', User);
})()