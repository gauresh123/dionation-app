import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../Redux/Actions/adminActions';
import AdminDashboard from '../Pages/adminDashBoard';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(adminLogin({ username, password }));
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Login failed. Please check your username and password.');
      }
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <section className='pt-[160px]'>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 items-center'>
          <div className="login-form" style={{ maxWidth: '400px', width: '100%' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h1>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
              <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[#7fad80] px-4 py-2 rounded-md mb-4"
                style={{ width: '100%' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#7fad80] px-4 py-2 rounded-md mb-4"
                style={{ width: '100%' }}
              />
              <button type="submit" className="text-white px-4 btn py-2 rounded-md" style={{ width: '100%' }}>Login</button>
              {error && <div className="text-green mt-2">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
