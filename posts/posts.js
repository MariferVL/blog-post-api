const express = require('express');
const router = express.Router();

// Sample data for posts
let posts = [
    { id: 1, title: 'First Post', content: 'Content of the first post' },
    { id: 2, title: 'Second Post', content: 'Content of the second post' },
];

// Get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// Create a new post
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1, // Generate a new ID based on the length of the array
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost); // Add the new post to the array
    res.status(201).json(newPost); // Respond with the created post and a 201 status
});

// Get a post by ID
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id)); // Find the post by ID
    if (!post) return res.status(404).send('Post not found'); // Return 404 if not found
    res.json(post); // Respond with the found post
});

// Update a post
router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id)); // Find the post by ID
    if (!post) return res.status(404).send('Post not found'); // Return 404 if not found

    post.title = req.body.title; // Update the post's title
    post.content = req.body.content; // Update the post's content
    res.json(post); // Respond with the updated post
});

// Delete a post
router.delete('/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id)); // Find the index of the post by ID
    if (postIndex === -1) return res.status(404).send('Post not found'); // Return 404 if not found

    posts.splice(postIndex, 1); // Remove the post from the array
    res.status(204).send(); // Respond with no content
});

module.exports = router;
