import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("API URL:", process.env.REACT_APP_API_URL);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
  name,
  email, 
  password
});
      
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Dashboard pe bhej dega
      
    } catch (err) {
  console.log('Full Error:', err) 
  console.log('Backend Bola:', err.response?.data)
  setError(err.response?.data?.message || 'Signup failed');
}
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;