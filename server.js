const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock user data (in real project, use database)
const users = {
  owner: { username: 'admin', password: 'admin123' },
  salesman: { username: 'sales', password: 'sales123' }
};

// Test route
app.get('/', (req, res) => {
  res.send('Alankar Tiles API is running');
});

// Login route
app.post('/login', (req, res) => {
  const { role, username, password } = req.body;

  if (!users[role]) {
    return res.status(400).json({ success: false, message: 'Invalid role' });
  }

  const user = users[role];
  if (username === user.username && password === user.password) {
    return res.json({ success: true, message: `${role} login successful` });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
