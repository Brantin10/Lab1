const express = require('express');
const path = require('path');
const app = express();

const publicDir = path.join(__dirname, 'public');

// Serve static files from the 'public' directory
app.use(express.static(publicDir));

// Route to send index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
