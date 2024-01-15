import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';

const ProductPage = () => {
  const auth = useAuth();
  const { id } = useParams() || 0;
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [bids, setBids] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState(null);
  const [autoBidding, setAutoBidding] = useState(false);
  let autoBiddingProducts = [];

  useEffect(() => {
    getProduct();
    getUser();
  }, [bidAmount, autoBidding]);
  const getProduct = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/product/show/${id}`, {
          headers: { Authorization: auth.user.token },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setProduct(response.data.data.product);
            setSeller(response.data.data.seller);
            if (auth.user.userData.role !== 'buyer') getBids();
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getUser = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/users/show/${auth.user.userData._id}`, {
          headers: { Authorization: auth.user.token },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            if (response.data.data.automaticBidding) {
              autoBiddingProducts = response.data.data.automaticBidding;
              setAutoBidding(autoBiddingProducts?.includes(id));
            }
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getBids = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/users/product-bids/${id}`, {
          headers: { Authorization: auth.user.token },
        })
        .then((response) => {
          if (response.data.success) {
            setBids(response.data.data);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        'http://localhost:5000/api/users/create-bid',
        {
          productId: id,
          amount: parseFloat(bidAmount),
          automaticBidding: false,
        },
        {
          headers: { Authorization: auth.user.token },
        }
      );

      if (response.data.success) {
        if (auth.user.userData.role !== 'buyer') getBids();
        setBidAmount('');
      }
      setMessage(response.data.message);
      response = await axios.put(
        `http://localhost:5000/api/users/update/${auth.user.userData._id}`,
        { automaticBidding: autoBiddingProducts.filter((item) => item !== id) },
        { headers: { Authorization: auth.user.token } }
      );

      if (response.data.success) {
        autoBiddingProducts = response.data.data.automaticBidding;
        setAutoBidding(response.data.data.automaticBidding?.includes(id));
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      setMessage(error.response.data.message);
    }
  };

  const handleAutoBidding = async (e) => {
    e.preventDefault();
    try {
      autoBiddingProducts.push(id);

      const response = await axios.put(
        `http://localhost:5000/api/users/update/${auth.user.userData._id}`,
        { automaticBidding: autoBiddingProducts },
        { headers: { Authorization: auth.user.token } }
      );

      if (response.data.success) {
        autoBiddingProducts = response.data.data.automaticBidding;
        setAutoBidding(response.data.data.automaticBidding?.includes(id));
      }
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  return (
    product && (
      <div className='container m- mb-2' style={{ maxWidth: '100%' }}>
        <h1>{product.name}</h1>
        <div className='row'>
          <div className='col-8'>
            <div className='card'>
              <img
                className='card-img-top'
                src={product.images[0]?.url}
                alt='Product'
              />
              <div className='card-body'>
                <p className='card-text'>{product.description}</p>
              </div>
              <div className='card-footer'>
                <div className='d-flex justify-content-between'>
                  <span>Seller: {seller.fullName}</span>
                  <span>Minimum Amount: Rs.{product.minimumBidAmount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='mb-2'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    {auth.user.userData.user_type === 'buyer'
                      ? 'Place bid'
                      : ''}
                  </h5>
                  <p className='card-text'>
                    <strong>Auction: </strong> {product.currentAuction?.name}
                  </p>
                  <p className='card-text'>
                    <strong>Current Price: </strong>
                    Rs.{product.currentBid}
                  </p>
                  {['admin', 'seller'].includes(
                    auth.user.userData.user_type
                  ) && (
                    <p className='card-text'>
                      <strong>Number of Bids: </strong> {bids?.length}
                    </p>
                  )}
                  {auth.user.userData.user_type === 'buyer' && (
                    <form className='mt-3'>
                      <div className='mb-3'>
                        <label htmlFor='bid' className='form-label'>
                          Submit a Bid
                        </label>
                        <input
                          type='number'
                          className='form-control'
                          id='bid'
                          name='bid'
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                      </div>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={handleSubmitBid}
                      >
                        Submit Bid
                      </button>
                      <button
                        className='btn btn-success ml-3'
                        onClick={handleAutoBidding}
                        disabled={autoBidding}
                      >
                        Auto Bidding
                      </button>
                      <p>{message}</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
            {auth.user.userData.user_type !== 'buyer' && (
              <div className='mb-2'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title text-success'>Bids</h5>
                    {bids?.map((bid, index) => (
                      <div className='row ' key={index}>
                        <strong className='col-3 card-text'>
                          {bid.buyer?.fullName}
                        </strong>
                        <p className='col-2 card-text'>{bid.amount}</p>
                        <p className='col-7 card-text'>
                          {new Date(bid.timestamp).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            timeZoneName: 'short',
                          })}
                        </p>{' '}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
