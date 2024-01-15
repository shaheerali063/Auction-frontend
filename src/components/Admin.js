import React from 'react';
import SelectUser from './SelectUser';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
    <div>
      <h1 className='text-center mb-5 mt-5'>Admin Page</h1>
      <SelectUser />

      <div className='container p-0'>
        <Link
          className='btn btn-primary mt-3'
          style={{ width: '150px' }}
          to={'/admin-product-report'}
        >
          Product Report
        </Link>
        <br />
        <Link
          className='btn btn-primary mt-3'
          style={{ width: '150px' }}
          to={'/admin-auction-report'}
        >
          Auction Report
        </Link>
        <br />
        <Link
          className='btn btn-primary mt-3'
          style={{ width: '150px' }}
          to={'/add-auction'}
        >
          Add Auction
        </Link>
      </div>
    </div>
  );
};
