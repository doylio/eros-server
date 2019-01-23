//Libraries
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

//Local
const {Item} = require('./../models/Item');
const {User} = require('./../models/User');


const testItems = [{
	_id: new ObjectID().toHexString(),
	active: true,
	notes: "Main website server",
	name: "Aragorn",
	stackType: "Ruby",
	IP_address: '1.2.3.4',
}, {
	_id: new ObjectID().toHexString(),
	active: false,
	notes: "Secondary website server",
	name: "Legolas",
	stackType: "LAMP",
	IP_address: '12.23.34.45',
}];

const populateItems = done => {
	Item.deleteMany()
		.then(() => Item.insertMany(testItems))
		.then(() => done())
		.catch(done);
}

const firstObjectID = new ObjectID();
const secondObjectID = new ObjectID();

const testUsers = [{
	_id: firstObjectID.toHexString(),
	username: "harry.potter",
	password: "ExpectoPatronum",
	superuser: true,
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: firstObjectID, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
}, {
	_id: secondObjectID.toHexString(),
	username: "ron.weasley",
	password: "EatSlugs",
	superuser: false,
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: secondObjectID, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
}];

const populateUsers = done => {
	User.deleteMany().then(() => {
		let user0 = new User(testUsers[0]);
		let user1 = new User(testUsers[1]);
		return Promise.all([user0.save(), user1.save()]);
	}).then(() => done())
	.catch(done);
}


module.exports = {populateItems, testItems, populateUsers, testUsers};