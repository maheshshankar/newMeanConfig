'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let chatSchema = new Schema({
	name: {type: String, index: true }
})

module.exports = mongoose.model('loginUsers', chatSchema);