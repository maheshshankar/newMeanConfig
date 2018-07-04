'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	name:String,
	title:String,
	content:String
})
	
// BlogSchema.pre('save', (next) => {
// 	//let blog = this;
// 	console.log(req.body);
// 	//next();
// })


module.exports = mongoose.model('myBlog', BlogSchema);