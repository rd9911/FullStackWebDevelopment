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

const errorHandler = (error, req, res, next) => {
    console.log(error)

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformated id" })
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error._message })
    }
    next(error)
}

app.get('/api/persons', async (req, res) => {
    const contacts = await Contact.find({})
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

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findOne({id: Number(req.params.id)})
        .then(selectedContact => {
            if (!selectedContact) {
                res.status(404).end()
            } else {
                res.json(selectedContact)
            }
        })
        .catch(error => {
            next(error)
        })

})

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findOneAndDelete({id: Number(req.params.id)})
        .then(updatedContacts =>{
            res.json(updatedContacts)
        })
        .catch(error => next(error))
})

app.post('/api/persons', async (req, res, next) => {
    const body = req.body
    console.log(body.name)
    if (body.name === undefined || body.number === undefined ) {
        return res.status(400).json({
            error: "missing data"
        })
    }
    
    const contact = new Contact({
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
        .catch(err => next(err))
})

app.put(`/api/persons/:id`, (req, res) => {
    const opts = { runValidators: true }
    console.log(req.body)
    Contact.findOneAndUpdate({id: req.params.id},
        {$set: {number: req.body.number}},
        {new:true},
    )
    .then(updatedContacts => {
        console.log(updatedContacts)
        res.json(updatedContacts)
    })
})

const unknownEndpoint = (req, res) => {
    return res.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`)
})
