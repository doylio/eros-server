require('./config/config');

//Libraries
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const {ObjectID} = require('mongodb');

//Local
const {mongoose} = require('./db/mongoose');
const {Item} = require('./models/Item');
const {User} = require('./models/User');
const {logError} = require('./logs/error');

//Server configuration
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('./logs/server.log', log + '\n', err => {
		if(err) {
			console.log("Unable to append to server.log");
		}
	})
	next();
});


//CLIENT ROUTE
app.get('/', (req, res) => {
	res.send('Client');
	//TODO: fill out route for client response
});

//CREATE ITEM
app.post('/item', (req, res) => {
	let body = _.pick(req.body, ['name', 'stackType', 'active', 'notes']);
	let item = new Item(body);
	item.setIpAddress();
	item.save()
		.then(item => {
			res.send({item});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});

});

//READ ALL ITEMS
app.get('/item', (req, res) => {
	Item.find()
		.then(items => {
			res.send({items});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//READ ONE ITEM
	//TODO if necessary


//UPDATE ITEM
app.patch('/item/:_id', (req, res) => {
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}
	let body = _.pick(req.body, ['name', 'stackType', 'active', 'notes']);
	Item.findOneAndUpdate({_id}, {$set: body}, {new: true})
		.then(item => {
			if(!item) {
				return res.status(404).send();
			}
			res.send({item});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//DELETE ITEM
app.delete('/item/:_id', (req, res) => {
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		return res.status(404).send();
	}
	Item.findOneAndDelete({_id})
		.then(item => {
			if(!item) {
				return res.status(404).send();
			}
			res.send({item});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//LOGIN USER
app.post('/login', (req, res) => {
	let {username, password} = req.body;
	User.findByCredentials(username, password)
		.then(user => user.generateAuthToken())
		.then(token => {
			res.header('x-auth', token).send();
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//LOGOUT USER

//CREATE USER - Only for superusers
app.post('/user', (req, res) => {
	let body = _.pick(req.body, ['username', 'password', 'superuser']);
	let user = new User(body);
	user.save()
		.then(user => {
			res.send({user});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//UPDATE USER
app.patch('/user/:_id', (req, res) => {
	let {_id} = req.params;
	let body = _.pick(req.body, ['password', 'superuser']);
	User.findOneAndUpdate({_id}, {$set: body}, {new: true})
		.then(user => {
			if(!user) {
				return res.status(404).send();
			}
			res.send({user});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//DELETE USER


app.listen(port, () => {
	console.log('Server is listening on port ', port);
});

module.exports = {app};