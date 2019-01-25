//Libraries
const mongoose = require('mongoose');
const util = require('util');


const ItemSchema = new mongoose.Schema({
	IP_address: {
		type: String,
		required: true,
		trim: true,
		min: 7,
		max: 39
	},
	name: {
		type: String,
		required: true,
	},
	stackType: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return v === 'LAMP' || 'MEAN' || 'Ruby' || 'Django';
			},
			message: props => `${props.value} is not a valid server stack`
		}
	},
	creator: {
		type: String,  //Add in required later
	},
	active: {
		type: Boolean,
		default: true,
	},
	notes: {
		type: String,
		default: ""	
	}
});

//To be replaced later by actually resetting the system
ItemSchema.statics.findByIdAndReset = function (_id) {
	return this.findOne({_id})
		.then(item => {
			const setTimeoutPromise = util.promisify(setTimeout);
			return setTimeoutPromise(5000, item);
		});
}

//To be replaced later by actually rebooting the system
ItemSchema.statics.findByIdAndReboot = function (_id) {
	return this.findOneAndUpdate({_id}, {$set: {active: false}}, {new: true})
		.then(item => this.findOneAndUpdate({_id}, {$set: {active: true}}, {new: true}))
		.then(item => {
			const setTimeoutPromise = util.promisify(setTimeout);
			return setTimeoutPromise(2000, item);
		});
};

//To be replaced later by the actual IP addresses
ItemSchema.methods.setIpAddress = function () {
	const rand = () => Math.floor(Math.random() * 128);
	this.IP_address = `${rand()}.${rand()}.${rand()}.${rand()}`;
};



const Item = mongoose.model('Item', ItemSchema);

module.exports = {Item};