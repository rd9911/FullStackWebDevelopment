const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { nanoid } = require('nanoid');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1
    });
    res.json(blogs);
});
  
blogRouter.post('/', async (req, res) => {
    const body = req.body;
    const user = req.user;
    console.log(user);
    if (!user) {
        return res.status(401).json({ error: 'unauthorized: token missing or invalid' });
    } else if (!body.title || !body.url) {
        return res.status(400).json({error: 'Missing data'});
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes ? body.likes : 0
    });
  
    const result = await blog.save();
    user.blogs = user.blogs.concat(blog);
    await user.save();
    return res.status(201).json(result);
});

blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id );
    res.json(blog);
});

blogRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    console.log(blog);
    console.log(req.user);
    if (blog.user.toString() !== req.user._id.toString() ) {
        return res.status(401).json({ error: 'missing or invalid token.' });
    }
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    return res.json(deletedBlog);
});

blogRouter.put('/', async (req, res) => {
    const updatedBlog = await Blog.findOneAndUpdate({title: req.body.title}, { $inc: {likes: 1}});
    res.json(updatedBlog);
});

module.exports = blogRouter;