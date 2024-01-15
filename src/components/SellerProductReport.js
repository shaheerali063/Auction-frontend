import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';

const SellerProductReport = () => {
  const auth = useAuth();
  const [productReport, setProductReport] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchProductReport = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/product-report',
          { headers: { Authorization: auth.user.token } }
        );
        if (response.data.success) {
          setProductReport(response.data.data);
        }
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching product report:', error.message);
        setMessage(error.message);
      }
    };

    fetchProductReport();
  }, []);

  return (
    <div>
      <p>{message}</p>
      <h2>Products Report</h2>
      {productReport && (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>

              <th>Seller</th>
              <th>Buyer</th>
              <th>Current Auction</th>
              <th>Minimum Bid Amount</th>
              <th>Status</th>
              <th>Current Bid</th>
            </tr>
          </thead>
          <tbody>
            {productReport.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>

                <td>{product.seller.username}</td>
                <td>{product.buyer ? product.buyer.username : 'N/A'}</td>
                <td>
                  {product.status === 'live'
                    ? product.currentAuction?.name
                    : 'N/A'}
                </td>
                <td>{product.minimumBidAmount}</td>
                <td>{product.status}</td>
                <td>{product.currentBid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerProductReport;
