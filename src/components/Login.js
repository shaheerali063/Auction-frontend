import React, { useContext, useState } from 'react';
// import '../assets/css/account.css';
// import { AuthContext } from '../context/auth';
import { useAuth } from '../context/auth';

const Login = () => {
  const auth = useAuth();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(userData);
  };
  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-8'>
          <h1 className='text-center mb-5'>Welcome to Auction House</h1>
          <form className='border border-secondary rounded p-3'>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='InputEmail'
                name='email'
                onChange={handleChange}
                aria-describedby='emailHelp'
                placeholder='Enter email'
              />
              <small id='emailHelp' className='form-text text-muted'>
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputPassword1'>Password</label>
              <input
                type='password'
                className='form-control'
                id='InputPassword'
                name='password'
                onChange={handleChange}
                placeholder='Password'
              />
            </div>
            <div className='mt-2'>
              <p>
                Don't have an account? <a href='/signup'>Create an account</a>
              </p>
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
