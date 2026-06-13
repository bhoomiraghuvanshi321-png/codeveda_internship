import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import Button from './Button';
import AddUser from './AddUser';

function App() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(error => {
  console.log("Fetch error:", error);
  setError("Failed to load users. Please try again.");
  setLoading(false);
});
}, []);
const handleAddUser = async (newUser) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setUsers([...users, data]);
  } catch (error) {
    console.log('Error:', error);
  }
};

const deleteUser = (idToDelete) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${idToDelete}`, { method: 'DELETE' })
    .then(() => setUsers(prevUsers => prevUsers.filter((user) => user.id !== idToDelete)))
    .catch((error) => console.error('Delete error:', error));
};

  const editUser = (idToEdit, updatedUser) => {
    setUsers(users.map((user) => 
      user.id === idToEdit? {...updatedUser, id: idToEdit } : user
    ));
  };

  return (
    <div className="App">
      <AddUser onAdd={handleAddUser} />

      {error && <p style={{color: 'red'}}>{error}</p>}
      {loading ? (
  <p>Loading...</p>
) : (
  users.map((user) => (
    <UserCard
      key={user.id}
      user={user}
      onDelete={() => deleteUser(user.id)}
      onEdit={editUser}
    />
  ))
)}
    </div>
  );
}

export default App;