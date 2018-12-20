const mongoose = require('mongoose')

const BaseModel = require('./base')
const User = require('./user')

const urlStringType = {
	type: String,
	match: /^https?:\/\/[^.]*\.[^.]*$/
}

const UserType = { type: mongoose.Schema.ObjectId, ref: User.name}

const TitleSchema = new mongoose.Schema({
	name: { type: String, required: true },
	date_aired: Date,
	episodes: [{
		name: String,
		number: { type: Number, min: 1 },
		video_iframe: urlStringType,
		video_url: urlStringType,
		date_aired: Date,
		date_voiced: Date,
		uploaded_by: UserType
	}],
	voicers: [UserType],
})

const _name = 'title'

class Title extends BaseModel {
	constructor () {
		super(_name, TitleSchema)
		this.name = _name
		this.Schema = TitleSchema
	}
	// find (conditions = {}, projection = {}, options = {}) {
	// 	return super.find(conditions, projection, options)
	// }
}

module.exports = new Title()
