require('./../config/config');

//Libraries
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

//Local
const {mongoose} = require('./mongoose');
const {User} = require('./../models/User');

let userId = new ObjectID();

let firstUser = new User({
	_id: userId.toHexString(),
	username: 'shawn.doyle',
	password: 'plaintext',
	superuser: true,
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userId, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
})

firstUser.save().then(() => console.log('Database initialized!'))

