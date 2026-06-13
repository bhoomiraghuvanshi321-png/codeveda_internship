const express = require('express');
const app = express();
app.use(express.json());

let users = [
  {id: 1, name: 'Aman'},
  {id: 2, name: 'Riya'}
];

// GET all users
app.get('/users', (req, res) => {
  res.status(200).json(users); // 200 = success
});

// POST create user  
app.post('/users', (req, res) => {
  const newUser = {id: users.length + 1, name: req.body.name};
  if(!req.body.name) {  
  return res.status(400).json({error: 'Name required'});
}
  users.push(newUser);
  res.status(201).json(newUser); // 201 = created
});

// PUT update user by ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if(isNaN(id)) {
    return res.status(400).json({error: 'Invalid ID'});
  }
  
  const user = users.find(u => u.id === id);
  if(!user) {
    return res.status(404).json({error: 'User not found'});
  }
  
  if(!req.body.name) {  
  return res.status(400).json({error: 'Name required'});
}
  
  user.name = req.body.name;
  res.status(200).json(user);
});

// DELETE user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if(isNaN(id)) {
    return res.status(400).json({error: 'Invalid ID'});
  }
  
  const user = users.find(u => u.id === id);
  if(!user) {
    return res.status(404).json({error: 'User not found'});
  }
  
  users = users.filter(u => u.id !== id);
  res.status(200).json({message: 'User deleted'});
});

// 404 catch-all route 
app.use((req, res) => {
  res.status(404).json({error: 'Route not found'});
});
// 500 error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: 'Something broke!'});
});
app.listen(5000, () => console.log('Server running on 5000'));