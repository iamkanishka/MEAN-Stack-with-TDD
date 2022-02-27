const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String
    },
    department: {
        type: [String],
        enum: ['Technology', 'Entertainment', 'Outdoor', 'Hardware', 'Sports', 'Other'],
        default: 'Other'
    }
}, {timestamps: true});

module.exports = mongoose.model('product', Product);
