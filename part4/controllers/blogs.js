const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { nanoid } = require('nanoid');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1
    });
    res.json(blogs);
});
  
blogRouter.post('/', async (req, res) => {
    const body = req.body;
    if (body.title === undefined && body.url === undefined) {
        res.status(400).send({error: 'Missing data'});
        return;
    }
    const user = await User.findById(body.userId);
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
    res.status(201).json(result);
});

blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id );
    res.json(blog);
});

blogRouter.delete('/:id', async (req, res) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.json(deletedBlog);
});

blogRouter.put('/', async (req, res) => {
    const updatedBlog = await Blog.findOneAndUpdate({title: req.body.title}, { $inc: {likes: 1}});
    res.json(updatedBlog);
});

module.exports = blogRouter;