const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


loginRouter.post('/', async (req, res) => {
    const body = req.body;

    const user = await User.findOne({username: body.username});
    const correctPassword = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);
    
    if (!(user && correctPassword)) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const userForToken = {
        username: user.username,
        id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;