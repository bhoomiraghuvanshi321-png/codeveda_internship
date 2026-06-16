const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect('mongodb://bhoomiraghuvanshi1_db_user:Bhoomi2026@ac-zv0jssh-shard-00-00.tpeq2n3.mongodb.net:27017,ac-zv0jssh-shard-00-01.tpeq2n3.mongodb.net:27017,ac-zv0jssh-shard-00-02.tpeq2n3.mongodb.net:27017/?ssl=true&replicaSet=atlas-femj12-shard-0&authSource=admin&appName=Cluster0')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// 1. GET /users - All users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST /users - New user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. GET /users/:id - One user
app.get('/users/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. PUT /users/:id - Update user
app.put('/users/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE /users/:id - Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));