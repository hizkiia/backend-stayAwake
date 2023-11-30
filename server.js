const express = require('express');
const mongoose = require('./database/db'); // adjust the path accordingly
const route = require('./handler/crud');
// const Login = require('./model');
const app = express();
const port = 3000;

// Define your Mongoose models and schemas here
app.use(express.json());
app.use(route);


// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


