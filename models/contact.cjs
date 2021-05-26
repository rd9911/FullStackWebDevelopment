const mongoose = require('mongoose')
const uri = process.env.MONGO_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
  date: Date
})

contactSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        delete returnedObj._id
        delete returnedObj.__v 
    }
})

module.exports = mongoose.model('Note', contactSchema)

