
# Blog Posts API 

Welcome to **Blog Posts API**! This project is a simple API for managing blog posts, similar to a very basic Medium platform. It’s built using Node.js, Express, and includes tests with Jest and Supertest. If you're new to building APIs, this is a great place to start!

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Overview
This project provides a simple API for creating, reading, updating, and deleting (CRUD) blog posts. By running this code, you’ll set up an API server that lets you:
- View a list of all posts
- Add new posts
- Retrieve a single post by ID
- Update posts by ID
- Delete posts by ID

## Features
- Basic CRUD operations for posts
- Stores data temporarily in memory (no database required)
- Uses JSON format for data handling
- Fully tested with Jest and Supertest

## Technologies Used
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Express](https://expressjs.com/) - Web framework for building APIs
- [CORS](https://www.npmjs.com/package/cors) - Middleware to handle Cross-Origin Resource Sharing
- [Body-Parser](https://www.npmjs.com/package/body-parser) - Middleware to parse incoming JSON request bodies
- [Jest](https://jestjs.io/) - Testing framework
- [Supertest](https://www.npmjs.com/package/supertest) - Tool for HTTP assertions in tests

## Getting Started

### Prerequisites
- Have [Node.js](https://nodejs.org/) installed
- Basic familiarity with JavaScript

### Installation

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/MariferVL/blog-post-api.git>
   ```
2. **Go to the project directory:**
   ```bash
   cd blog-posts-api-medium
   ```
3. **Install all required packages:**
   ```bash
   npm install
   ```

### Running the Server
To start the API server, open your terminal in the project directory and run:
```bash
node server.js
```
The server should start at `http://localhost:3000`, and you'll see a message confirming that it’s running.

## File Structure
Here’s a quick look at the files included in this project:

```
├── posts/
│   └── posts.js            # Routes for handling blog posts
├── tests/
│   └── server.test.js      # Test cases for our API
├── server.js               # Main server file
└── package.json            # Project configuration and dependencies
```

### Explanation of Key Files
- **server.js**: This file sets up the Express server, connects middleware (CORS, body-parser), and loads our routes for handling blog posts.
- **posts/posts.js**: This file contains all the routes for our blog posts. It includes routes to get, add, update, and delete posts.
- **tests/server.test.js**: This file contains tests to check that our API is working correctly. It uses Jest and Supertest to make sure each endpoint does what it’s supposed to.

## API Endpoints

Each endpoint lets us interact with our blog posts in different ways.

### 1. Get All Posts
- **URL**: `/api/posts`
- **Method**: `GET`
- **Description**: Returns a list of all posts.

### 2. Get a Single Post
- **URL**: `/api/posts/:id`
- **Method**: `GET`
- **Description**: Returns a single post by its ID.

### 3. Create a New Post
- **URL**: `/api/posts`
- **Method**: `POST`
- **Description**: Creates a new post.
- **Request Body**:
  ```json
  {
    "title": "Post Title",
    "content": "Post Content"
  }
  ```

### 4. Update a Post
- **URL**: `/api/posts/:id`
- **Method**: `PUT`
- **Description**: Updates an existing post.
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content"
  }
  ```

### 5. Delete a Post
- **URL**: `/api/posts/:id`
- **Method**: `DELETE`
- **Description**: Deletes a post by its ID.

## Testing

Testing is an important step to make sure everything in your API works as expected. This project includes tests that cover the functionality of each endpoint.

1. **Create the `tests/server.test.js` file** with the following code:

    ```javascript
    const request = require('supertest');
    const express = require('express');
    const postsRoutes = require('../posts/posts');

    const app = express();
    app.use(express.json());
    app.use('/api/posts', postsRoutes);

    describe('Posts API', () => {
        it('should get all posts', async () => {
            const res = await request(app).get('/api/posts');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should create a new post', async () => {
            const newPost = { title: 'Test Post', content: 'Test Content' };
            const res = await request(app).post('/api/posts').send(newPost);
            expect(res.statusCode).toEqual(201);
            expect(res.body.title).toBe('Test Post');
        });

        it('should get a post by ID', async () => {
            const res = await request(app).get('/api/posts/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', 1);
        });

        it('should update a post by ID', async () => {
            const updatedPost = { title: 'Updated Title', content: 'Updated Content' };
            const res = await request(app).put('/api/posts/1').send(updatedPost);
            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toBe('Updated Title');
        });

        it('should delete a post by ID', async () => {
            const res = await request(app).delete('/api/posts/1');
            expect(res.statusCode).toEqual(204);
        });
    });
    ```

2. **Run Tests**:
   To execute the tests, open your terminal and run:
   ```bash
   npm test
   ```
   The test results will show whether each endpoint works as expected.

## License
This project is licensed under the ISC License.