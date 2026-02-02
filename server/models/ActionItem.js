const mongoose = require('mongoose');

const actionItemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['remind', 'email', 'invite', 'prioritize'],
        default: 'remind'
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActionItem', actionItemSchema);
