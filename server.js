const express = require('express');

const dotenv = require('dotenv');
const routes = require('./routes/routes')
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const app = express();


// Database & Env
dotenv.config();
require('./database/db');

// PORT AND PATH
const PORT = process.env.PORT || 8000;
// const VERSION_API = '/api/v1';
// const appendUrl = (url) => `${VERSION_API}${url}`;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get("/", (req, res) => {
    console.log("Response success")
    res.send("Response success!")
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});


