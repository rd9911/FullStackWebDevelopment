const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const testHelper = require('./test_helper.cjs');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(testHelper.initialBlogs);
});

describe('get all blogs', () => {
    test('get list of blogs in JSON format', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(6);
    });
});

describe('get a specific blog by id', () => {
    test('get a blog', async () => {
        const requestedBlog = await testHelper.blogsInDB();
        await api.get(`/api/blogs/${requestedBlog[0].id}`).expect(200);
    });
    
    test('id is defined', async () => {
        const requestedBlog = await testHelper.blogsInDB();
        const response = await api.get(`/api/blogs/${requestedBlog[0].id}`).expect(200);
        expect(response.body.id).toBeDefined();
        expect(response.body._id).toBe(undefined);
    });
});

describe('post', () => {
    test('post a blog', async () => {
        const blogs = await testHelper.blogsInDB();
        const blog = new Blog({
            title: 'Suomi',
            author: 'Ler',
            url: 'ola.com',
            likes: 9
        });
        await api.post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        expect(await testHelper.blogsInDB()).toHaveLength(blogs.length + 1);
    });

    // test('likes default to 0 if it is missing', async () => {
    //     const blogs = await testHelper.blogsInDB();
    //     const blog = new Blog({
    //         title: 'Suomi',
    //         author: 'Ler',
    //         url: 'ola.com',
    //     });
    //     await blog.save();
    //     const updatedBlogs = await testHelper.blogsInDB();
    //     console.log(updatedBlogs[blogs.length]);
    //     expect(updatedBlogs[blogs.length].likes).toBe(0);
    // });
});

afterAll((done) => {
    mongoose.connection.close();
    done();
});