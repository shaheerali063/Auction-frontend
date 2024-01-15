import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';

const AuctionReport = () => {
  const auth = useAuth();
  const [auctionReport, setAuctionReport] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchAuctionReport = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/auctions/all-auctions',
          { headers: { Authorization: auth.user.token } }
        );
        if (response.data.success) {
          setAuctionReport(response.data.data);
        }
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching auction report:', error.message);
        setMessage(error.message);
      }
    };

    fetchAuctionReport();
  }, []);

  const handleApproveAuction = async (auctionId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/approve-auction/${auctionId}`,
        {},
        { headers: { Authorization: auth.user.token } }
      );
      if (response.data.success) {
        // Update auction status to approved in the local state
        setAuctionReport((prevAuctions) =>
          prevAuctions.map((auction) =>
            auction._id === auctionId
              ? { ...auction, status: 'approved' }
              : auction
          )
        );
      }
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error approving auction:', error.message);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <p>{message}</p>
      <h2>Auctions Report</h2>
      {auctionReport && (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>No. products</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Minimum Bids</th>
              <th>Active</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {auctionReport.map((auction) => (
              <tr key={auction._id}>
                <td>{auction.name}</td>

                <td>{auction.products?.length || 0}</td>
                <td>{auction.startTime}</td>
                <td>{auction.endTime}</td>
                <td>{auction.minimumBids}</td>
                <td>{auction.active ? 'Yes' : 'No'}</td>
                <td>{auction.status}</td>
                <td>
                  {auction.status === 'pending' && (
                    <button
                      className='btn btn-success'
                      onClick={() => handleApproveAuction(auction._id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuctionReport;
