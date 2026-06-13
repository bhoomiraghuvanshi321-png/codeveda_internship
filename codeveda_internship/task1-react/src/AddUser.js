import { useState } from 'react';

function AddUser({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
  alert('Please fill both fields');
  return;
}
    onAdd({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUser;