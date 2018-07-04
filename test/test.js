let mongoose = require('mongoose');
let express = require('express');
let User = require('../schema/schema');
let server = require('../server');
let app = express();
let routes = require('../routes/routes')(app);
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

mongoose.promise = global.promise;

/*before((done) => {
	mongoose.connect('mongodb://localhost/mean');
	mongoose.connection
	.once('open', () => {
		console.warn('DB Connection Established');
		done();
	})
	.on('error', (err) => {
		console.warn(err);
	})
})*/

describe('Test DB Connection', () => {
	beforeEach(() => {
		
	})
})

describe('Get All Users', () => {
	it('should get all users', (done) => {
		chai.request(routes)
			.get('/app')
			.end((err, res) => {	
				console.log('ERR - ', err);
				console.log('myRes - ', res);
			})
	})
})
