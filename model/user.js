const mongoose = require('mongoose')

const BaseModel = require('./base')

const roles = [
	'supa-pipik', //super-admin, duh
	'pipik', // admin
	'voicer',
	'editor',
	'moderator',
	'timer',
	'pipiker', // follower
]

const urlStringType = {
	type: String,
	match: /^https?:\/\/[^.]*\.[^.]*$/
}

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	role: { type: String, enum: roles },
	_accessLevel: { type: Number, min: -99, max: 99 },
	social: { type: Map, of: urlStringType },
})

UserSchema.index({ name: 1 }, { unique: true, name: 'uniq names' })

class User extends BaseModel {
	constructor () {
		super('user', UserSchema)
		this.roles = roles
	}
	find (conditions = {},
		projection = {
			name: true,
			social: true,
		}, options = {

		}) {
		return this.model.find(conditions, projection, options)
	}
}

module.exports = new User()
