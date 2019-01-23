//Libraries
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	superuser: {
		type: Boolean,
		default: false,
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	return _.pick(this.toObject(), ['username', '_id', 'superuser']);
}

UserSchema.methods.generateAuthToken = function () {
	let {_id} = this;
	let access = 'auth';
	let token = jwt.sign({_id, access}, process.env.JWT_SECRET).toString();
	this.tokens.push({access, token});
	return this.save().then(() => token);
}

UserSchema.statics.findByCredentials = function (username, password) {
	return this.findOne({username})
		.then(user => {
			if(!user) {
				return Promise.reject();
			}
			return bcrypt.compare(password, user.password);
		})
		.then(match => {
			if(match) {
				return this.findOne({username});
			} else {
				return Promise.reject();
			}
		});
}

UserSchema.pre('save', function (next) {
	if(this.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
				this.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
