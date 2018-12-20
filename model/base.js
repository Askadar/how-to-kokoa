const mongoose = require('mongoose')
const connect = require('./connection')

class BaseModel {
	constructor (name, Schema) {
		if (new.target === BaseModel)
			throw new Error ('BaseModel is abstract')

		this.connection = connect().then(a => this.connection = a)
		this.model = mongoose.model(name, Schema)

		this.name = name
		this.Schema = Schema

		return this
	}
	findOne (id) {
		const doc = this.model.findById(id)
		doc.then(console.log)
		return doc
	}
	async insertOne (document) {
		let doc = new this.model(document)
		let result = await doc.validate().then(() => doc.save())
			.catch(err => console.error(err) || ({
				error: true, details: err
			}))
		return result
	}
	find () {
		return this.model.find(...arguments)
	}
}

module.exports = BaseModel
