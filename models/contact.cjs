const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const uri = process.env.MONGODB_URI

console.log('connecting to ', uri)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(res => console.log('connected to MongoDB'))
  .catch(error => console.log(error))

const contactSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique:true },
  name: { type: String, minLength: [3, "Too short name."], required: true, unique: true },
  // Change String to Number and validate it thru toString().length
  number: { type: String, minLength: [8, "The number should includen at least 8 integers."], required: true},
  date: { type: Date, required: true}
})

contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        delete returnedObj._id
        delete returnedObj.__v 
    }
})


// Contact.schema.path('number').validate( (value)  => {
//   return value.toString().length >= 8;
// }, "Too short number.")

module.exports = mongoose.model('Note', contactSchema)