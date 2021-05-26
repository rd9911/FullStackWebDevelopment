const { response } = require('express')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://user8889:${password}@contacts-app.5wdr9.mongodb.net/contact-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(response => {
  console.log(response)
})

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length > 3) {
  const note = new Note({
    name: process.argv[3],
    number: process.argv[4]
  })
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  console.log(process.argv)

} else if (process.argv.length === 3) {
  Note.find({}).then(result => {
    console.log(Note)

    mongoose.connection.close()
})
}
