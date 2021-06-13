const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { nanoid } = require('nanoid');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});
  
blogRouter.post('/', async (req, res) => {
    const body = req.body;
    if (body.title === undefined && body.url === undefined) {
        res.status(400).send({error: 'Missing data'});
        return;
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    });
  
    const result = await blog.save();
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