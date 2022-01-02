require('dotenv').config();

const mongodbUri = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URI 
    : process.env.MONGODB_URI;
const port = process.env.PORT;

module.exports = { mongodbUri, port };