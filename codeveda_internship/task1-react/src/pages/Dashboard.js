import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // No token, send to login
      return;
    }

    // Use environment variable, not localhost
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
      headers: { 'x-auth-token': token }
    }).then(res => {
      setUser(res.data);
      setLoading(false);
    }).catch(err => {
      console.log('Error fetching user:', err);
      localStorage.removeItem('token'); // Remove invalid token
      navigate('/login');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>Error: User not found</h1>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      
      {/* Add User old code will be here */}
    </div>
  );
};

export default Dashboard;