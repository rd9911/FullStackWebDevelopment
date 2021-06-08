require('dotenv').config()

mongodbUri = process.env.MONGODB_URI
port = process.env.PORT

module.exports = { mongodbUri, port }