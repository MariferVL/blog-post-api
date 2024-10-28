const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoutes = require('./posts/posts');

// Set up the test application
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/posts', postsRoutes);

// Tests for the posts endpoints
describe('Posts API', () => {
    // Sample data for posts
    let initialPosts;

    // Initial setup before each test
    beforeEach(() => {
        initialPosts = [
            { id: 1, title: 'First Post', content: 'Content of the first post' },
            { id: 2, title: 'Second Post', content: 'Content of the second post' }
        ];
    });

    // Test for getting all posts
    test('GET /api/posts - Should return all posts', async () => {
        const response = await request(app).get('/api/posts');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining(initialPosts));
    });

    // Test for creating a new post
    test('POST /api/posts - Should create a new post', async () => {
        const newPost = { title: 'New Post', content: 'Content of the new post' };
        const response = await request(app).post('/api/posts').send(newPost);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(newPost.title);
        expect(response.body.content).toBe(newPost.content);
    });

    // Test for getting a specific post by ID
    test('GET /api/posts/:id - Should return a specific post', async () => {
        const response = await request(app).get('/api/posts/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title', 'First Post');
        expect(response.body).toHaveProperty('content', 'Content of the first post');
    });

    // Test for getting a non-existent post
    test('GET /api/posts/:id - Should return 404 for a non-existent post', async () => {
        const response = await request(app).get('/api/posts/999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Post not found');
    });

    // Test for updating an existing post
    test('PUT /api/posts/:id - Should update an existing post', async () => {
        const updatedPost = { title: 'Updated Post', content: 'Updated content' };
        const response = await request(app).put('/api/posts/1').send(updatedPost);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', updatedPost.title);
        expect(response.body).toHaveProperty('content', updatedPost.content);
    });

    // Test for updating a non-existent post
    test('PUT /api/posts/:id - Should return 404 when trying to update a non-existent post', async () => {
        const updatedPost = { title: 'Non-existent Post', content: 'Non-existent content' };
        const response = await request(app).put('/api/posts/999').send(updatedPost);
        expect(response.status).toBe(404);
        expect(response.text).toBe('Post not found');
    });

    // Test for deleting an existing post
    test('DELETE /api/posts/:id - Should delete an existing post', async () => {
        const response = await request(app).delete('/api/posts/1');
        expect(response.status).toBe(204);
    });

    // Test for deleting a non-existent post
    test('DELETE /api/posts/:id - Should return 404 when trying to delete a non-existent post', async () => {
        const response = await request(app).delete('/api/posts/999');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Post not found');
    });
});
