require('./config/config');

const {User} = require('./models/User');
const {mongoose} = require('./db/mongoose');


User.findOne({name: 'testname8'}).then(user => {
	user.generateAuthToken().then(console.log);
});