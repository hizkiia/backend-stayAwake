const express = require('express');
const mongoose = require('./database/db'); // adjust the path accordingly
const routes = require('./routes/routes');
// const Login = require('./model');
const app = express();
const port = 3000;

// Define your Mongoose models and schemas here
app.use(express.json());
app.use(routes);


// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


