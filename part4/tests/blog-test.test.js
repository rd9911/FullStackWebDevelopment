const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const testHelper = require('./testHelper.cjs');
const User = require('../models/user');

const api = supertest(app);
beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await Blog.insertMany(testHelper.initialBlogs);
    await api.post('/api/users').send(testHelper.initialUsers[0]);
});

describe('Blog', () => {
    test('get list of blogs in JSON format', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(6);
    });

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

    test('post a blog', async () => {
        const userToLogin = {
            username: 'pola123',
            password: 'abc123'
        };
        const responseFromLogin = await api.post('/api/login')
            .send(userToLogin)
            .expect(200)
            .expect('Content-Type', /application\/json/);        
        const tokenToAuthorize = `bearer ${responseFromLogin.body.token}`;
        const blogsBeforePost = await testHelper.blogsInDB();
        const blogToPost = {
            title: 'Suomi',
            author: 'Ler',
            url: 'ola.com',
            likes: 9
        };
        await api.post('/api/blogs')
            .send(blogToPost)
            .set('Authorization', tokenToAuthorize)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const blogsAfterPost = await testHelper.blogsInDB();
        expect(blogsAfterPost).toHaveLength(blogsBeforePost.length + 1);
    });

    test('if there is no token 401 error is thrown', async () => {
        const blogToPost = {
            title: 'Suomi',
            author: 'Ler',
            url: 'ola.com',
            likes: 9
        };
        const response = await api.post('/api/blogs')
            .send(blogToPost)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        
        expect(response.body.error).toContain('unauthorized: token missing or invalid');
    });

    test('likes default to 0 if it is missing', async () => {
        const userToLogin = {
            username: 'pola123',
            password: 'abc123'
        };
        const responseFromLogin = await api.post('/api/login')
            .send(userToLogin)
            .expect(200)
            .expect('Content-Type', /application\/json/);        
        const tokenToAuthorize = `bearer ${responseFromLogin.body.token}`;

        const blogToPost = {
            title: 'Suomi',
            author: 'Ler',
            url: 'ola.com',
        };
        await api.post('/api/blogs')
            .send(blogToPost)
            .set('Authorization', tokenToAuthorize)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const blogsAfterPost = await testHelper.blogsInDB();
        const indexOfPostedBlog = blogsAfterPost.length - 1;
        expect(blogsAfterPost[indexOfPostedBlog].likes).toBe(0);
    });

    test('delete blog by its id', async () => {
        const responseFromLogin = await api.post('/api/login')
            .send({ username: 'pola123', password: 'abc123'}).expect(200).expect('Content-Type', /application\/json/);        
        const tokenToAuthorize = `bearer ${responseFromLogin.body.token}`;
        await api.post('/api/blogs')
            .send({title: 'Suomi', author: 'Ler', url: 'ola.com'}).set('Authorization', tokenToAuthorize).expect(201).expect('Content-Type', /application\/json/);

        const blogs = await testHelper.blogsInDB();
        const blogToDeleteId = blogs[blogs.length -1].id;
        await api.delete(`/api/blogs/${blogToDeleteId}`)
            .set('Authorization', tokenToAuthorize)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const updatedBlogs = await testHelper.blogsInDB();
        expect(updatedBlogs).toHaveLength(blogs.length - 1);
    });

    test('increment likes', async () => {
        const blogs = await testHelper.blogsInDB();
        const blogToLike = blogs[0];
        await api.put(`/api/blogs/${blogToLike.id}`);
        const updatedBlogs = await testHelper.blogsInDB();
        expect(updatedBlogs[0].likes).toBe(blogToLike.likes + 1);
    });

});


describe('User', () => {
    test('create a user', async () => {
        const users = await testHelper.usersInDB();
        const user = {
            username: 'Halio Uroni',
            password: 'abc123'
        };

        await api.post('/api/users')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        
        const usersAfterPost = await testHelper.usersInDB();
        expect(usersAfterPost).toHaveLength(users.length + 1);
    });

    test('fails by not giving a username or password', async () => {
        const user = {
            name: 'Lop'
        };
        const response = await api.post('/api/users')
            .send(user)
            .expect(400);
        expect(response.body.error).toContain('Username and password are required');
    } );

    test('fails if username or password is less than 3 characters', async () => {
        const user1 = {
            username: 'Ha',
            name: 'paul',
            password: 'aloi'
        };
        const response1 = await api.post('/api/users')
            .send(user1)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(response1.body.error).toContain('required 3 characters minimum in password or username.');

        const user2 = {
            username: 'Halo',
            name: 'Loup',
            password: 'p'
        };
        const response2 = await api.post('/api/users')
            .send(user2)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(response2.body.error).toContain('required 3 characters minimum in password or username.');
    });

    test('in blog object user key is defined', async () => {
        const responseFromLogin = await api.post('/api/login')
            .send({ username: 'pola123', password: 'abc123'}).expect(200).expect('Content-Type', /application\/json/);
        const tokenToAuthorize = `bearer ${responseFromLogin.body.token}`;
        const blogToPost = {
            url: 'https://dot.com',
            title: 'Beauty of the nature.',
            author: 'Clementine',
        };
        const responseFromPost = await api.post('/api/blogs')
            .send(blogToPost)
            .set('Authorization', tokenToAuthorize)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        expect(responseFromPost.body.user).toBeDefined();
    });

    test('fail to create repeated usernames', async () => {
        const user = {
            username: 'pola123',
            name: 'oluni',
            password: 'abc123',
            blogs: []
        };

        const response = await api.post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(response.body.error).toContain('User validation failed');
    });
});

afterAll((done) => {
    mongoose.connection.close();
    done();
});