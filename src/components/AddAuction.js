import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';

const AddAuction = () => {
  const auth = useAuth();
  const [response, setResponse] = useState(null);
  const [auctionData, setAuctionData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    minimumBids: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuctionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/create-auction',
        auctionData,
        {
          headers: {
            Authorization: auth.user.token,
          },
        }
      );
      console.log(response.data.message);
      setResponse(response.data.message);
    } catch (error) {
      console.error('Error creating auction:', error.message);
    }
  };

  return (
    <div className='container mt-5'>
      {response && <p> {response}</p>}
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Auction Name</label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={auctionData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='startTime'>Start Time</label>
              <input
                type='datetime-local'
                className='form-control'
                id='startTime'
                name='startTime'
                value={auctionData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='endTime'>End Time</label>
              <input
                type='datetime-local'
                className='form-control'
                id='endTime'
                name='endTime'
                value={auctionData.endTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='minimumBids'>Minimum Bids</label>
              <input
                type='number'
                className='form-control'
                id='minimumBids'
                name='minimumBids'
                value={auctionData.minimumBids}
                onChange={handleChange}
                required
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Add Auction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAuction;
