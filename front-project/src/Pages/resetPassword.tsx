import { useState } from 'react';
import axios from 'axios';
import './reset_forgot.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await axios.post('http://localhost:8888/getflixProject/api/reset_password.php', {
        token,
        new_password: password,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className='template d-flex justify-content-center align-items-center vh-100'>
    <div className='col-md-6 d- none d-flex align-items-center h-100'>
      <img src='assets/reset.svg' alt='Description' className='img-fluid' />
    </div>
    <div className='col-md-6 d-flex flex-column h-100'>
      <div className='forgot_card p-5 flex-fill'>
        <form className='h-100 d-flex flex-column justify-content-center'>
          <h3 className='text-center mb-4'>Reset Password</h3>
          <div className='mb-2'>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              placeholder='Enter your new password' 
              className='form-control'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              placeholder='Confirm your new password' 
              className='form-control'
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='mt-2 mb-2'>
            <button className='btn mb-3' onClick={handleResetPassword} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default ResetPassword;