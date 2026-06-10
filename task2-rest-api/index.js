const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

// CORS and JSON middleware 
app.use(cors());
app.use(express.json());

// Hardcoded users array
let users = [
  { id: 1, name: "Aman", email: "aman@gmail.com" },
  { id: 2, name: "Sara", email: "sara@gmail.com" }
];

// 1. GET route 
app.get('/users', (req, res) => {
  res.json(users);
});

// 2. POST route 
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 3. PUT route 
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[userIndex].name = req.body.name;
  users[userIndex].email = req.body.email;
  res.json(users[userIndex]);
});

// 4. DELETE route 
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id!== userId);
  res.status(204).send();
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});