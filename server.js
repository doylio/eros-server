require('./config/config');

//Libraries
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const {ObjectID} = require('mongodb');
const cors = require('cors');

//Local
const {mongoose} = require('./db/mongoose');
const {Item} = require('./models/Item');
const {User} = require('./models/User');
const {logError} = require('./logs/error');
const {authenticate} = require('./middleware/authenticate');

//Server configuration
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());
app.use(cors({
	exposedHeaders: ['x-auth']
}));
app.use((req, res, next) => {
	if(process.env.NODE_ENV !== 'test') {
		let now = new Date().toString();
		let log = `${now}: ${req.method} ${req.url}`;
		console.log(log);
		fs.appendFile('./logs/server.log', log + '\n', err => {
			if(err) {
				console.log("Unable to append to server.log");
			}
		})
		next();
	} else {
		next();
	}
});


//CLIENT ROUTE
// app.get('/', express.static('./public'));

//CREATE ITEM
app.post('/item', authenticate, (req, res) => {
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
app.get('/item', authenticate, (req, res) => {
	Item.find()
		.then(items => {
			res.send({items});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//UPDATE ITEM
app.patch('/item/:_id', authenticate, (req, res) => {
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		return res.status(400).send();
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
app.delete('/item/:_id', authenticate, (req, res) => {
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		return res.status(400).send();
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

//REBOOT ITEM
app.post('/reboot/:_id', authenticate, (req, res) => {
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		return res.status(400).send();
	}
	Item.findByIdAndReboot(_id)
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

//RESET ITEM
app.purge('/reset/:_id', authenticate, (req, res) => {
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		return res.status(400).send();
	}
	Item.findByIdAndReset(_id)
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
		.then(user => {
			user.lastLogin = new Date().toLocaleString();
			return user.save();
		})
		.then(user => user.generateAuthToken())
		.then(token => {
			res.header('x-auth', token).send();
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//LOGOUT USER
app.delete('/logout', authenticate, (req, res) => {
	req.user.removeToken(req.token)
		.then(() => {
			res.send();
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//READ ALL USERS - superuser only
app.get('/user', authenticate, (req, res) => {
	if(!req.user.superuser) {
		res.status(401).send();
	}
	User.find()
		.then(users => {
			res.send({users});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});


//CREATE USER - superuser only
app.post('/user', authenticate, (req, res) => {
	if(!req.user.superuser) {
		return res.status(401).send();
	}
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

//UPDATE USER - superuser only
app.patch('/user/:_id', authenticate, (req, res) => {
	if(!req.user.superuser) {
		return res.status(401).send();
	}
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		return res.status(400).send();
	}
	let {password, superuser} = req.body;
	User.findOne({_id})
		.then(user => {
			if(!user) {
				return res.status(404).send();
			}
			if(password) {
				user.password = password;
			}
			if(superuser !== undefined) {
				user.superuser = superuser;
			}
			return user.save()
		}).then(user => {
			res.send({user});
		}).catch(e => {
			res.status(400).send();
			logError(e, req);
		});
});

//DELETE USER - superuser only
app.delete('/user/:_id', authenticate, (req, res) => {
	if(!req.user.superuser) {
		return res.status(401).send();
	}
	let {_id} = req.params;
	if(!ObjectID.isValid(_id)) {
		res.status(400).send();
	}
	User.findOneAndDelete({_id})
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

//Init Server
app.listen(port, () => {
	console.log('Server is listening on port ', port);
});


module.exports = {app};