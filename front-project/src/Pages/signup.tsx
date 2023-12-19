// import { Link } from 'react-router-dom';
import { FormEvent } from 'react';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import './login_singup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8888/getflixProject/api/registration.php', formData);
      console.log(response.data);

      if (response.data.status === '200') {
        setRegistrationMessage('Successfully registered!');

        // Use setTimeout for redirection after a delay (e.g., 2000 milliseconds)
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setRegistrationMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
  <div className="overflow-hidden">
    <div className='signup_body template d-flex justify-content-center align-items-center vh-100'>
    <div className='col-md-6 col-12 d-flex flex-column h-100'>
            <div className='signup_card p-5 flex-fill'>
          <form className='h-100 d-flex flex-column justify-content-center' onSubmit={handleSubmit}>
            <h3 className='text-center'>Sign Up</h3>
            <div className='mb-2'>
              <label htmlFor='username'>Username</label>
              <input
                  type='text'
                  placeholder='Enter your username'
                  className='form-control'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className='mb-2'>
              <label htmlFor='firstname'>Firstname</label>
              <input
                  type='text'
                  placeholder='Enter your firstname'
                  className='form-control'
                  name='firstname'
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className='mb-2'>
              <label htmlFor='lastname'>Lastname</label>
              <input
                  type='text'
                  placeholder='Enter your lastname'
                  className='form-control'
                  name='lastname'
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
            </div>          
            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input
                  type='email'
                  placeholder='Enter email'
                  className='form-control'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className='mb-2'>
              <label htmlFor='password'>Password</label>
              <input
                  type='password'
                  placeholder='Enter password'
                  className='form-control'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className='mb-2'>
              <label htmlFor='role'></label>
              <input type="hidden" name="role" value="user"/>
            </div>
            <div className='mt-2 mb-2'>
              <button className='btn'>Sign Up</button>
            </div>
            <p className='text-end mt-2'>
              Already Registered? <a href='login' className='link_login ms-2'>Log in</a>
            </p>
            {registrationMessage && (
              <p className='text-center text-success'>{registrationMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Signup
