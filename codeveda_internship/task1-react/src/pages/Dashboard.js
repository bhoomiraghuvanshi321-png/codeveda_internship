import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // send to login page if there is no Token
      return;
    }

    axios.get('http://localhost:5000/api/auth/me', {
      headers: { 'x-auth-token': token }
    }).then(res => {
      setUser(res.data);
    }).catch(err => {
      console.log('Error fetching user:', err);
      localStorage.removeItem('token'); // Remove if token is wrong
      navigate('/login');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (!user) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>

      {/* Add User old code will be here */}
    </div>
  );
}

export default Dashboard;