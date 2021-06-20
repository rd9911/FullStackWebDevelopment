const express = require('express');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const app = express();
require('express-async-errors');
const mongoose = require('mongoose');
const middlewares = require('./utils/middleware');
const configs = require('./utils/config');

const mongoUrl = configs.mongodbUri;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });


app.use(cors());
app.use(express.json());
app.use(middlewares.tokenExtractor);
app.use(middlewares.requestLogger);

app.use('/api/blogs',  middlewares.userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;