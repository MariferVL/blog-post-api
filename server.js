const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postsRoutes = require('./posts/posts'); // Import posts routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS. cors(): Configures the server to accept requests from any origin, which is useful during development.
app.use(bodyParser.json()); // Parse JSON in request bodies.
//bodyParser.json(): Allows the server to receive and understand JSON data in HTTP request bodies.

app.use('/api/posts', postsRoutes); // Use routes defined in postsRoutes

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
