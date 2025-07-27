// src/admin-components/admin-login-components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'manish@gmail.com' && password === 'manish123') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='container mt-5 pt-5'>
      <h2 className='text-center'>Admin Login</h2>
      <div className='row justify-content-center'>
        <div className='col-md-5 shadow p-4 bg-light rounded'>
          <input type="email" className="form-control mb-3" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-dark w-100" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
