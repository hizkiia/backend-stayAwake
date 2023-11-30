const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:stayawake215314011@stayawake.rpumvhv.mongodb.net/?retryWrites=true&w=majority'; // replace with your actual connection string

mongoose.connect(uri
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
