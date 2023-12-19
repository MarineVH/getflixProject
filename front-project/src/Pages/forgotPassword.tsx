import { useState } from 'react';
import axios from 'axios';
import './reset_forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8888/getflixProject/api/forgot_password.php', {
        email: email,
      });

      if (response.data.success) {
        setMessage('Password reset instructions sent to your email.');
      } else {
        setMessage('Please check your email. If you did not receive email, try again.');
      }
    } catch (error) {
      console.error('Error initiating password reset:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className='template d-flex justify-content-center align-items-center vh-100'>
        <div className='col-md-6 col-12 d-flex flex-column h-100'>
          <div className='forgot_card p-5 flex-fill'>
            <form className='h-100 d-flex flex-column justify-content-center'>
              <h3 className='text-center mb-4'>Forgot password</h3>
              <p className='mb-4'>Enter your email address to receive instructions for resetting your password.</p>
              <div className='mb-4'>
                <label htmlFor='email'>Email: </label>
                <input
                  type="email"
                  placeholder='Enter your email'
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className='btn mb-3' onClick={handleForgotPassword} disabled={isLoading}>
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
              <p aria-live="polite">{message}</p>
            </form>
          </div>
        </div>
        <div className='col-md-6 d-none d-md-flex align-items-center h-100'>
            <img src='assets/forgot.svg' alt='Description' className='img-fluid' />
        </div>
  </div>
</div>

  );
};

export default ForgotPassword;

