//Libraries
const mongoose = require('mongoose');



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

ItemSchema.methods.setIpAddress = function () {
	const rand = () => Math.floor(Math.random() * 128);
	this.IP_address = `${rand()}.${rand()}.${rand()}.${rand()}`;
};



const Item = mongoose.model('Item', ItemSchema);

module.exports = {Item};