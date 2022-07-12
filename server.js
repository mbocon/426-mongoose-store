// Dependencies

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const productsController = require('./controllers/products');

// Initialize the App
const app = express();

// Configure the app settings
require('dotenv').config();
const PORT = process.env.PORT;

// Database connection
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error.message + 'mongoDB error!');
});

db.on('connected', () => {
    console.log('mongoDB successfully connected');
});

db.on('disconnected', () => {
    console.log('mongoDB disconnected');
});

// Middleware
app.use(express.urlencoded({ extended: false })); // body-parser
app.use(express.static('public')) // Makes assets in public folder available to the application.
app.use(methodOverride('_method')); // Allow us to use app.put and app.delete

// Mount routes
app.get('/', (req, res) => {
    res.redirect('/products')
})

// Router middleware
app.use('/products', productsController)

// Listen on PORT
app.listen(PORT, () => {
    console.log(`Express is listening on PORT ${PORT}`)
})




