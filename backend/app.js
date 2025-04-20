const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/fake-image', require('./routes/fakeImageRoutes'));
app.use('/api/fake-video', require('./routes/fakeVideoRoutes'));
app.use('/api/fake-audio', require('./routes/fakeAudioRoutes'));
app.use('/api/fake-news', require('./routes/fakeNewsRoutes'));

module.exports = app;
