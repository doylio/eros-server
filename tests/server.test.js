//Libraries
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

//Local
const {app} = require('./../server');
const {Item} = require('./../models/Item');
const {User} = require('./../models/User');
const {populateItems, testItems, populateUsers, testUsers} = require('./seed');

beforeEach(populateItems);
beforeEach(populateUsers);

describe('POST /item', () => {
	it('should create an item', done => {
		let body = {
			name: 'Gimli',
			stackType: 'MEAN',
			active: false,
			notes: 'This server is for the new features'
		}
		let {token} = testUsers[0].tokens[0];
		request(app)
		.post('/item')
		.set('x-auth', token)
		.send(body)
		.expect(200)
		.expect(res => {
			expect(res.body.item).toMatchObject(body);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Item.find()
				.then(items => {
					expect(items.length).toBe(3);
					expect(items.reverse()[0]).toMatchObject(body);
					done();
				}).catch(done);
		});
	});
	it('should not create an item without a name', done => {
		let body = {
			stackType: 'MEAN',
			active: false,
			notes: 'This server is for the new features'
		}
		let {token} = testUsers[1].tokens[0];
		request(app)
		.post('/item')
		.set('x-auth', token)
		.send(body)
		.expect(400)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Item.find()
				.then(items => {
					expect(items.length).toBe(2);
					done();
				}).catch(done);
		});
	});
	it('should not create an item without a stackType', done => {
		let body = {
			name: 'Gandalf',
			active: false,
			notes: 'This server is for the new features'
		}
		let {token} = testUsers[0].tokens[0];
		request(app)
		.post('/item')
		.set('x-auth', token)
		.send(body)
		.expect(400)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Item.find()
				.then(items => {
					expect(items.length).toBe(2);
					done();
				}).catch(done);
		});
	});
	it('should not create an item without a valid token', done => {
		let body = {
			name: 'Gandalf',
			active: false,
			notes: 'This server is for the new features'
		}
		let token = "NotAJWT";
		request(app)
		.post('/item')
		.set('x-auth', token)
		.send(body)
		.expect(401)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Item.find()
				.then(items => {
					expect(items.length).toBe(2);
					done();
				}).catch(done);
		});
	});
});

describe('GET /item', () => {
	it('should return the list of items', done => {
		let {token} = testUsers[0].tokens[0];
		request(app)
		.get('/item')
		.set('x-auth', token)
		.expect(200)
		.end((err, res) => {
			if(err) {
				done(err);
			}
			Item.find()
				.then(items => {
					expect(items[0]._id.toHexString()).toBe(res.body.items[0]._id);
					expect(items[1]._id.toHexString()).toBe(res.body.items[1]._id);
					expect(items[0].__v).toBe(res.body.items[0].__v);
					expect(items[1].__v).toBe(res.body.items[1].__v);
					done();
				}).catch(done);
		});
	});
	it('should reject an invalid token', done => {
		let token = "NotAJWT";
		request(app)
		.get('/item')
		.set('x-auth', token)
		.expect(401)
		.expect(res => {
			expect(res.body.items).not.toBeDefined();
		})
		.end(done);
	});
});

describe('PATCH /item/:_id', () => {
	it('should update the item', done => {
		let body = {
			name: 'Frodo',
			notes: 'This server is buggy',
			active: false,
		};
		let {token} = testUsers[1].tokens[0];
		let {_id} = testItems[0];
		request(app)
		.patch(`/item/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(200)
		.expect(res => {
			expect(res.body.item).toMatchObject(body);
		})
		.end(done);
	});
	it('should not return 404 for non-existent item', done => {
		let body = {
			name: 'Sam',
			active: false,
		}
		let {token} = testUsers[0].tokens[0];
		let _id = new ObjectID();
		request(app)
		.patch(`/item/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(404)
		.end(done);
	});
	it('should not return 400 for invalid ObjectID', done => {
		let body = {
			name: 'Sam',
			active: false,
		};
		let {token} = testUsers[1].tokens[0];
		let _id = 'ThisIsNotAnObjectID';
		request(app)
		.patch(`/item/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(400)
		.end(done);
	});
	it('should reject an invalid token', done => {
		let body = {
			name: 'Frodo',
			notes: 'This server is buggy',
			active: false,
		};
		let token = "NotAJWT";
		let {_id} = testItems[0];
		request(app)
		.patch(`/item/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(401)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Item.findOne({_id})
				.then(item => {
					expect(item.name).toBe(testItems[0].name);
					done()
				}).catch(done);
		});
	});
});

describe('DELETE /item/:_id', () => {
	it('should delete the item', done => {
		let {_id} = testItems[1];
		let {token} = testUsers[1].tokens[0];
		request(app)
		.delete(`/item/${_id}`)
		.set('x-auth', token)
		.expect(200)
		.expect(res => {
			expect(res.body.item).toMatchObject(testItems[1]);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Item.findOne({_id})
				.then(item => {
					expect(item).toBeNull();
					done();
				}).catch(done);
		});
	});
	it('should return 404 for non-existent item', done => {
		let _id = new ObjectID();
		let {token} = testUsers[0].tokens[0];
		request(app)
		.delete(`/item/${_id}`)
		.set('x-auth', token)
		.expect(404)
		.end(done);
	});
	it('should return 400 for invalid ObjectID', done => {
		let _id = 'ThisIsNotAnObjectID';
		let {token} = testUsers[1].tokens[0];
		request(app)
		.delete(`/item/${_id}`)
		.set('x-auth', token)
		.expect(400)
		.end(done);
	});
	it('should reject an invalid token', done => {
		let {_id} = testItems[1];
		let token = "NotAJWT";
		request(app)
		.delete(`/item/${_id}`)
		.set('x-auth', token)
		.expect(401)
		.expect(res => {
			expect(res.body.item).not.toBeDefined();
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Item.findOne({_id})
				.then(item => {
					expect(item).toBeDefined();
					done();
				}).catch(done);
		});
	});
});

describe('POST /reboot/:_id', () => {
	it('should reboot the server', done => {
		let {_id} = testItems[0];
		let {token} = testUsers[1].tokens[0];
		request(app)
		.post(`/reboot/${_id}`)
		.set('x-auth', token)
		.expect(200)
		.end(done)
	});
	it('should return 400 for invalid ObjectID', done => {
		let _id = "ThisIsNotAnObjectID";
		let {token} =  testUsers[1].tokens[0];
		request(app)
		.post(`/reboot/${_id}`)
		.set('x-auth', token)
		.expect(400)
		.end(done)
	});
	it('should return 404 for non-existent ObjectID', done => {
		let _id = new ObjectID();
		let {token} = testUsers[1].tokens[0];
		request(app)
		.post(`/reboot/${_id}`)
		.set('x-auth', token)
		.expect(404)
		.end(done)
	});
	it('should reject an invalid token', done => {
		let {_id} = testItems[0];
		let token = "NotAJWT";
		request(app)
		.post(`/reboot/${_id}`)
		.set('x-auth', token)
		.expect(401)
		.end(done)
	})
});

describe('PURGE /reset/:_id', () => {
	it('should reset the server', done => {
		let {_id} = testItems[1];
		let {token} = testUsers[1].tokens[0];
		request(app)
		.purge(`/reset/${_id}`)
		.set('x-auth', token)
		.expect(200)
		.end(done)
	});
	it('should return 404 for non-existent ObjectID', done => {
		let _id = new ObjectID();
		let {token} = testUsers[1].tokens[0];
		request(app)
		.purge(`/reset/${_id}`)
		.set('x-auth', token)
		.expect(404)
		.end(done)
	});
	it('should return 400 for invalid ObjectID', done => {
		let _id = "ThisIsNotAnObjectID";
		let {token} = testUsers[1].tokens[0];
		request(app)
		.purge(`/reset/${_id}`)
		.set('x-auth', token)
		.expect(400)
		.end(done)
	});
	it('should reset the server', done => {
		let {_id} = testItems[1];
		let token = "NotAJWT";
		request(app)
		.purge(`/reset/${_id}`)
		.set('x-auth', token)
		.expect(401)
		.end(done)
	});
})

describe('GET /user', () => {
	it('should return the list of users', done => {
		let {token} = testUsers[0].tokens[0];
		request(app)
		.get('/user')
		.set('x-auth', token)
		.expect(200)
		.expect(res => {
			expect(res.body.users).toBeDefined();
			expect(res.body.users.length).toBe(2);
		})
		.end(done);
	});
	it('should return 401 for an invalid token', done => {
		let token = 'NotAJWT';
		request(app)
		.get('/user')
		.set('x-auth', token)
		.expect(401)
		.expect(res => {
			expect(res.body.users).not.toBeDefined();
		})
		.end(done);
	});
	it('should return 401 for a non-superuser token', done => {
		let {token} = testUsers[1].tokens[0];
		request(app)
		.get('/user')
		.set('x-auth', token)
		.expect(401)
		.expect(res => {
			expect(res.body.users).not.toBeDefined();
		})
		.end(done);
	});
});

describe('POST /user', () => {
	it('should create a new user', done => {
		let body = {
			username: "hermione.granger",
			password: "Crookshanks",
			superuser: false,
		}
		let {token} = testUsers[0].tokens[0];
		request(app)
		.post('/user')
		.set('x-auth', token)
		.send(body)
		.expect(200)
		.expect(res => {
			expect(res.body.user.password).not.toBeDefined();
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.findOne({username: body.username})
				.then(user => {
					expect(user).toBeDefined();
					expect(user.username).toBe(body.username);
					expect(user.superuser).toBe(body.superuser);
					done();
				}).catch(done);
		});
	});
	it('should return 400 for non-unique name', done => {
		let body = {
			username: "harry.potter",
			password: "Crookshanks",
			superuser: false,
		}
		let {token} = testUsers[0].tokens[0];
		request(app)
		.post('/user')
		.set('x-auth', token)
		.send(body)
		.expect(400)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.find()
				.then(users => {
					expect(users.length).toBe(2);
					done();
				}).catch(done);
		});
	});
	it('should reject an invalid token', done => {
		let body = {
			username: "harry.potter",
			password: "Crookshanks",
			superuser: false,
		}
		let token = "NotAJWT";
		request(app)
		.post('/user')
		.set('x-auth', token)
		.send(body)
		.expect(401)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.find()
				.then(users => {
					expect(users.length).toBe(2);
					done();
				}).catch(done);
		});
	});
	it('should reject a non-superuser', done => {
		let body = {
			username: "harry.potter",
			password: "Crookshanks",
			superuser: false,
		}
		let {token} = testUsers[1].tokens[0];
		request(app)
		.post('/user')
		.set('x-auth', token)
		.send(body)
		.expect(401)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.find()
				.then(users => {
					expect(users.length).toBe(2);
					done();
				}).catch(done);
		});
	});
});

describe('PATCH /user/:_id', () => {
	it('should update the user', done => {
		let {_id} = testUsers[1];
		let body = {
			password: "Quidditch",
			superuser: true
		};
		let {token} = testUsers[0].tokens[0];
		request(app)
		.patch(`/user/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(200)
		.expect(res => {
			expect(res.body.user.password).not.toBeDefined();
			expect(res.body.user.superuser).toBe(body.superuser);
		})
		.end((err, res) =>{
			if(err) {
				return done(err);
			}
			User.findOne({_id})
				.then(user => {
					expect(user.superuser).toBe(body.superuser);
					done();
				}).catch(done);
		});
	});
	it('should return 404 for non-existent user', done => {
		let _id = new ObjectID();
		let body = {
			password: "Quidditch",
			superuser: true
		};
		let {token} = testUsers[0].tokens[0];
		request(app)
		.patch(`/user/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(404)
		.expect(res => {
			expect(res.body.user).not.toBeDefined();
		})
		.end(done);
	});
	it('should return 400 for invalid ObjectID', done => {
		let _id = "ThisIsNotAnObjectID";
		let body = {
			password: "Quidditch",
			superuser: true
		};
		let {token} = testUsers[0].tokens[0];
		request(app)
		.patch(`/user/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(400)
		.expect(res => {
			expect(res.body.user).not.toBeDefined();
		})
		.end(done);
	});
	it('should reject an invalid token', done => {
		let {_id} = testUsers[1];
		let body = {
			password: "Quidditch",
			superuser: true
		};
		let token = "NotAJWT";
		request(app)
		.patch(`/user/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(401)
		.expect(res => {
			expect(res.body.user).not.toBeDefined();
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.findOne({_id})
				.then(user => {
					expect(user.superuser).not.toBe(body.superuser);
					done();
				}).catch(done);
		});
	});
	it('should reject a non superuser', done => {
		let {_id} = testUsers[1];
		let body = {
			password: "Quidditch",
			superuser: true
		};
		let {token} = testUsers[1].tokens[0];
		request(app)
		.patch(`/user/${_id}`)
		.set('x-auth', token)
		.send(body)
		.expect(401)
		.expect(res => {
			expect(res.body.user).not.toBeDefined();
		})
		.end((err, res) =>{
			if(err) {
				return done(err);
			}
			User.findOne({_id})
				.then(user => {
					expect(user.superuser).not.toBe(body.superuser);
					done();
				}).catch(done);
		});
	});
});

describe('POST /login', () => {
	it('should return an auth token and set the last login', done => {
		let {username, password} = testUsers[0];
		request(app)
		.post('/login')
		.send({username, password})
		.expect(200)
		.expect(res => {
			expect(res.headers['x-auth']).toBeDefined();
		}).end((err, res) => {
			if(err) {
				return done(err);
			}
			User.findOne({username})
				.then(user => {
					expect(user.tokens.length).toBe(2);
					expect(user.tokens.reverse()[0].token).toBe(res.headers['x-auth']);
					expect(user.lastLogin).not.toBeNull();
					done();
				}).catch(done);
		});
	});
	it('should reject an invalid password', done => {
		let {username} = testUsers[1];
		let password = 'NotThePassword';
		request(app)
		.post('/login')
		.send({username, password})
		.expect(400)
		.expect(res => {
			expect(res.headers['x-auth']).not.toBeDefined();
		}).end(done);
	});
	it('should reject an invalid username', done => {
		let {password} = testUsers[1];
		let username = 'draco.malfoy';
		request(app)
		.post('/login')
		.send({username, password})
		.expect(400)
		.expect(res => {
			expect(res.headers['x-auth']).not.toBeDefined();
		}).end(done);
	});
});
describe('DELETE /logout', () => {
	it('should remove the user auth token', done => {
		let {_id} = testUsers[1];
		let {token} = testUsers[1].tokens[0];
		request(app)
		.delete('/logout')
		.set('x-auth', token)
		.expect(200)
		.end((err, res) => {
			if(err){
				return done(err);
			}
			User.findOne({_id})
				.then(user => {
					expect(user.tokens.length).toBe(0);
					done()
				}).catch(done);
		});
	});
	it('should return 401 for an invalid token', done => {
		let token = "NotAJWT";
		request(app)
		.delete('/logout')
		.set('x-auth', token)
		.expect(401)
		.end(done);
	});
});
describe('DELETE /user/:_id', () => {
	it('should delete the user', done => {
		let {_id} = testUsers[0];
		let {token} = testUsers[0].tokens[0];
		request(app)
		.delete(`/user/${_id}`)
		.set('x-auth', token)
		.expect(200)
		.expect(res => {
			expect(res.body.user._id).toBe(_id);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.find({_id})
				.then(users => {
					expect(users.length).toBe(0);
					done()
				}).catch(done);
		});
	});
	it('should delete a different user', done => {
		let {_id} = testUsers[1];
		let {token} = testUsers[0].tokens[0];
		request(app)
		.delete(`/user/${_id}`)
		.set('x-auth', token)
		.expect(200)
		.expect(res => {
			expect(res.body.user._id).toBe(_id);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.findOne({_id})
				.then(user => {
					expect(user).toBeNull();
					done()
				}).catch(done);
		});
	});
	it('should return 400 for invalid ObjectID', done => {
		let _id = "ThisIsNotAnObjectID";
		let {token} = testUsers[0].tokens[0];
		request(app)
		.delete(`/user/${_id}`)
		.set('x-auth', token)
		.expect(400)
		.end(done);
	});
	it('should return 404 for non-existent users', done => {
		let _id = new ObjectID();
		let {token} = testUsers[0].tokens[0];
		request(app)
		.delete(`/user/${_id}`)
		.set('x-auth', token)
		.expect(404)
		.end(done);
	});
	it('should return 401 for an invalid token', done => {
		let {_id} = testUsers[1];
		let token = "NotAJWT";
		request(app)
		.delete(`/user/${_id}`)
		.set('x-auth', token)
		.expect(401)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.findOne({_id})
				.then(user => {
					expect(user).toBeDefined();
					done()
				}).catch(done);
		});
	});
	it('should return 401 for non-superusers', done => {
		let {_id} = testUsers[1];
		let {token} = testUsers[1].tokens[0];
		request(app)
		.delete(`/user/${_id}`)
		.set('x-auth', token)
		.expect(401)
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			User.findOne({_id})
				.then(user => {
					expect(user).toBeDefined();
					done()
				}).catch(done);
		});
	});
});

