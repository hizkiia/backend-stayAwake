const express = require('express');
const mongoose = require('./db'); // adjust the path accordingly

const app = express();
const port = 3000;

// Define your Mongoose models and schemas here

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
