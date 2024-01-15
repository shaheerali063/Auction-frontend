import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';

const SelectUser = () => {
  const auth = useAuth();

  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // Fetch available users (sellers/buyers) from the server
    const fetchAvailableUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/', {
          headers: { Authorization: auth.user.token },
        });
        if (response.data.success) {
          setAvailableUsers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching available users:', error.message);
      }
    };

    fetchAvailableUsers();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <Link
          to={`update-user/${selectedUser}`}
          className='btn btn-primary mr-5'
          style={{ width: '150px' }}
        >
          Show
        </Link>
        <select
          className='form-control col-4'
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value=''>Select User</option>
          {availableUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}-{user.email}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectUser;
