const { response, request } = require('express');
require('dotenv').config()
const sslRedirect = require('heroku-ssl-redirect').default
const express = require('express');
const morgan = require('morgan');
const Contact = require('./models/contact.cjs');
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(sslRedirect())
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const generateId = () => {
    const randNum = Math.floor(Math.random() * 5000)
    return randNum;
}

app.get('/api/persons', async (req, res) => {
    const contacts = await Contact.find({})
    console.log(contacts)
    if (contacts.length > 0) {
        res.json(contacts)
    }
})

app.get('/info', (req, res) => {
    Contact.find({})
        .then(contacts => {
            let message = `Phonebook has info for ${contacts.length} people`
            const timeStamp = new Date()
            console.log(message, timeStamp)
            res.send(`<div><p>${message}</p><p>${timeStamp}</p></div>`)
        })

})

app.get('/api/persons/:id', (req, res) => {
    Contact.findOne({id: Number(req.params.id)})
        .then(selectedContact => {
            if (!selectedContact) {
                res.status(404).end()
            } else {
                res.json(selectedContact)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: "malformed id"})
        })

})

app.delete('/api/persons/:id', (req, res) => {
    Contact.findOneAndDelete({id: Number(req.params.id)})
        .then(updatedContacts =>{
            res.json(updatedContacts)
        }
    )
})

app.post('/api/persons', async (req, res) => {
    const body = req.body
    console.log(body.name)
    if (!body.name || !body.number ) {
        return res.status(400).json({
            error: "missing data"
        })
    }
    
    const contact = Contact({
        id: generateId(),
        name: body.name,
        number: body.number,
        date: new Date()
    })
    console.log(contact)
    contact.save()
        .then(savedContact => {
            res.json(savedContact)
        })
        .catch(error => {
            console.log(error)
        })
        }    
)

app.put(`/api/persons/:id`, (req, res) => {
    console.log(req.body)
    Contact.findOneAndUpdate({id: req.params.id},
        {$set: {number: req.body.number}},
        {new:true}
    )
    .then(updatedContacts => 
        res.json(updatedContacts)
    )
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`)
})
