// Mongoose Schema/Model
const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        artist: String,
        description: String,
        img: String,
        price: { type: Number, min: 0 },
        qty: { type: Number, min: 0 }
    }
)

module.exports = mongoose.model('Product', productSchema)