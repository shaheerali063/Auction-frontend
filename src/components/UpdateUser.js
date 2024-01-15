import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';

const UpdateUser = () => {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    user_type: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/show/${id}`,
          { headers: { Authorization: auth.user.token } }
        );
        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          console.error('Error fetching user details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/update/${id}`,
        userData,
        { headers: { Authorization: auth.user.token } }
      );

      if (response.data.success) {
        navigate(`/admin`);
      } else {
        console.error('Error updating user:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  const handleAddAdmin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/add-admin',
        {
          userId: id,
        },
        { headers: { Authorization: auth.user.token } }
      );

      if (response.data.success) {
        console.log('Admin added successfully');
      }
    } catch (error) {
      console.error('Error adding admin:', error.message);
    }
  };
  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Update User</h1>
      <p>{message}</p>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='fullName'>User Name</label>
              <input
                type='text'
                className='form-control'
                id='fullName'
                name='fullName'
                value={userData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>User Email</label>
              <textarea
                className='form-control'
                id='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Role</label>
              <div className='form-check'>
                <input
                  type='radio'
                  id='buyer'
                  name='user_type'
                  value={userData.user_type}
                  className='form-check-input'
                  checked={userData.user_type === 'buyer'}
                  onChange={handleChange}
                />
                <label htmlFor='buyer' className='form-check-label'>
                  Buyer
                </label>
              </div>
              <div className='form-check'>
                <input
                  type='radio'
                  id='seller'
                  name='user_type'
                  value='seller'
                  className='form-check-input'
                  checked={userData.user_type === 'seller'}
                  onChange={handleChange}
                />
                <label htmlFor='seller' className='form-check-label'>
                  Seller
                </label>
              </div>
            </div>

            <button type='submit' className='btn btn-primary'>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
