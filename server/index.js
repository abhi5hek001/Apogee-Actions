require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ActionItem = require('./models/ActionItem');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes

// GET: Fetch all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await ActionItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create new item
app.post('/api/items', async (req, res) => {
    try {
        const newItem = new ActionItem({
            text: req.body.text,
            category: req.body.category
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Update item (toggle complete)
app.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await ActionItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Remove item
app.delete('/api/items/:id', async (req, res) => {
    try {
        await ActionItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
