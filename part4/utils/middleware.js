const jwt = require('jsonwebtoken');
const User = require('../models/user');

const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method);
    logger.info('Path: ', req.path);
    logger.info('Body: ', req.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
    console.log(error);
    if (error.name === 'CasrError') {
        res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' });
    }
    next(error);
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    }
    next();  
};

// const userExtractor = (req, res, next) => {
//     const decodedToken = jwt.verify(req.token, process.env.SECRET);
//     if (decodedToken && req.token) {
//         const user = User.findById(decodedToken.id);
//         req.user = user;
//     }
//     next();
// };


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    // userExtractor
};