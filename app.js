// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://Rohanrj:GkgZMKgI8ozWsKcE@clusterrj.yjeyk.mongodb.net/notes', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Routes
// Routes
app.use('/notes', noteRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports= app;
