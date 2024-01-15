import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuctionCard from './AuctionCard';
import { useAuth } from '../context/auth';

const AuctionListing = () => {
  const auth = useAuth();
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/auctions/available-auctions',
          { headers: { Authorization: auth.user.token } }
        );
        if (response.data.success) {
          setAuctions(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching auctions:', error.message);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Auction Listing</h1>
      <div className='row'>
        {auctions.map((auction) => (
          <div key={auction._id} className='col-md-6'>
            <AuctionCard auction={auction} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionListing;
