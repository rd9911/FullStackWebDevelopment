const User = require('../models/user');
const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
// const helperFunctions = require('../utils/helper_list');

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1
    });
    res.json(users);
});

userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('blogs', {
        url: 1,
        title: 1,
        author: 1
    });
    res.json(user);
});


userRouter.post('/', async (req, res) => {
    const body = req.body;
    if( !body.username || !body.password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    if (body.username.length < 3 || body.password.length < 3) { // update it using helperFunctions.checkLength(str, atLeast)
        return res.status(400).json({ error: 'required 3 characters minimum in password or username.' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
        username: body.username,
        name: body.name,
        blogs: [],
        passwordHash,
    });

    const savedUser = await user.save();
    res.json(savedUser);
});

module.exports = userRouter;