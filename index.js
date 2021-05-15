const { response, request } = require('express');
const express = require('express');
const morgan = require('morgan');
const morganBody = require('morgan-body')
const static = require('static')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const generateId = () => {
    const randNum = Math.floor(Math.random() * 5000)
    return randNum;
}

const isExist = (arr, name) => {
    const found = arr.find(arrItem => arrItem.name === name) ? true : false
    return found;
}

let notes = [
    {
        id: 1,    
        name: "HTML is easy",    
        number: "676-887-87868"
    },
    {  
        id: 2,    
        name: "HTML is easy",    
        number: "676-887-87868"
    },  
    { 
        id: 3,    
        name: "HTML y",    
        number: "676-887-87868"
    }
 ]

app.get('/api/persons', (req, res) => {
    res.json(notes)
})

app.get('/info', (req, res) => {
    let message = `Phonebook has info for ${notes.length} people`
    const timeStamp = new Date()
    console.log(message, timeStamp)
    res.send(`<div><p>${message}</p><p>${timeStamp}</p></div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (!note) {
        res.status(404).end()
    } else {
        res.json(note)
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.json(notes)
})


app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "missing data"
        })
    } else if (isExist(notes, body.name) === true) {
        return res.status(400).json({
            error: "existed data"
        })
    }
    const note = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    notes = notes.concat(note)

    res.json(note)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is working on ${port}`)
})