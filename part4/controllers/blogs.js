const blogRouter = require('express').Router();
const Blog = require('../models/blog');

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

blogRouter.delete('/:id', async (req, res) => { // need new middleware to verify the user
    const blog = await Blog.findOne({_id: req.params.id});
    if (blog.user.toString() !== req.user._id.toString() ) {
        return res.status(401).json({ error: 'missing or invalid token.' });
    }
    const deletedBlog = await Blog.findOneAndRemove({_id: req.params.id});
    return res.json(deletedBlog);
});

blogRouter.put('/:id', async (req, res) => {    
    const updatedBlog = await Blog.findOneAndUpdate({_id: req.params.id}, { $inc: {likes: 1}});
    res.json(updatedBlog);
});

blogRouter.put('/:id/comments', async (req, res) => {
    const commentedBlog = await Blog.findOneAndUpdate(
        { _id: req.params.id }, { $push: { comments: req.body.comment}});
    console.log(commentedBlog);
    return res.json(commentedBlog);
});

module.exports = blogRouter;