const path = require('path');
const ck = require('ckey');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const mongoose = require('mongoose')
const uri = ck.MONGO_URI
console.log(typeof uri)
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