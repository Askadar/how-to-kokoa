const mongoose = require('mongoose')

var connection = null
const getConnection = () => {
	if (!connection){
		connection = mongoose.connect('mongodb://localhost:27017/Anipipik', {
			useNewUrlParser: true
		})
		console.log('connecting')
	}
	return connection
}

module.exports = getConnection
