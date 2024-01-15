import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuctionCard = ({ auction }) => {
  const { name, startTime, endTime, minimumBids, active, status } = auction;

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className='card-text'>
          <strong>Start Time:</strong> {new Date(startTime).toLocaleString()}{' '}
          <br />
          <strong>End Time:</strong> {new Date(endTime).toLocaleString()} <br />
          <strong>Minimum Bids:</strong> {minimumBids} <br />
          <strong>Status:</strong> {status} <br />
          <strong>Products:</strong> {auction.products?.length} <br />
        </p>
      </div>
      <div className='card-footer text-muted'>
        <div className='d-flex justify-content-between'>
          <span>{active ? 'Active Auction' : 'Inactive Auction'}</span>
          <Link className='btn btn-primary' to={`/auction/${auction._id}`}>
            See Auction
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
