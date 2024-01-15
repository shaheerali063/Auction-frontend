import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';

const USER_PRODUCTS = 'http://localhost:5000/api/users/products';
const AVAILABLE_AUCTIONS =
  'http://localhost:5000/api/auctions/available-auctions';
const LIST_PRODUCT_ENDPOINT = 'http://localhost:5000/api/users/list-product';

const Home = () => {
  const auth = useAuth();

  const [products, setProducts] = useState(null);
  const [availableAuctions, setAvailableAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [message, setMessage] = useState(null);
  const [deleteFlag, setDeleteFlag] = useState(null);

  useEffect(() => {
    getProducts();
    getAvailableAuctions();
    setDeleteFlag(false);
  }, [deleteFlag]);

  const getProducts = async () => {
    try {
      await axios
        .get(USER_PRODUCTS, {
          headers: { Authorization: auth.user.token },
        })
        .then((response) => {
          if (response.data.success) setProducts(response.data.data);
          setMessage(response.data?.message);
        });
    } catch (e) {
      console.log(e);
      setMessage(e?.message);
    }
  };
  const getAvailableAuctions = async () => {
    try {
      const response = await axios.get(AVAILABLE_AUCTIONS, {
        headers: { Authorization: auth.user.token },
      });

      if (response.data.success) {
        setAvailableAuctions(response.data.data);
      }
      // setMessage(response.data?.message);
    } catch (error) {
      console.error('Error fetching available auctions:', error.message);
      setMessage(error.message);
    }
  };
  const handleListProduct = async (productId) => {
    if (selectedAuction) {
      try {
        const response = await axios.post(
          LIST_PRODUCT_ENDPOINT,
          { productId, auctionId: selectedAuction },
          {
            headers: { Authorization: auth.user.token },
          }
        );

        if (response.data.success) {
          console.log('Product listed successfully!');
          // Redirect to the specific auction page
          // history.push(`/auction/${selectedAuction}`);
          setMessage(response.data.message);
        } else {
          console.error('Error listing product:', response.data.message);
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error listing product:', error.message);
        setMessage(error.message);
      }
    } else {
      console.warn('Please select an auction to list the product.');
      setMessage('Please select an auction to list the product.');
    }
  };
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/delete/${productId}`,
        {
          headers: { Authorization: auth.user.token },
        }
      );
      setDeleteFlag(true);
      console.log(deleteFlag);
    } catch (error) {}
  };

  return (
    <>
      <h1 className='text-center mb-5 mt-5'>Home</h1>
      <p>{message}</p>
      <div className='container'>
        <div className='row'>
          {auth.user.userData.user_type === 'seller' && (
            <div>
              <Link className='btn btn-primary m-2' to={'/add-product'}>
                Add Product
              </Link>

              <Link className='btn btn-primary m-2' to={'/add-auction'}>
                Add Auction
              </Link>
              <Link
                className='btn btn-primary m-2'
                to={'/seller-product-report'}
              >
                Report
              </Link>
            </div>
          )}
        </div>
        <div className='row'>
          {products &&
            products.map((product, index) => (
              <div className='col-md-4 mb-3' key={index}>
                <div className='card'>
                  <img
                    src={product.images[0]?.url}
                    className='card-img-top'
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className='card-body' style={{ minHeight: '250px' }}>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>{product.description}</p>
                    <p className='card-text'>
                      Current bid Price: Rs {product.currentBid}
                    </p>
                    <p className='card-text'>Status: {product.status}</p>
                    {product.status === 'live' && (
                      <Link
                        className='btn btn-primary'
                        to={`/product/${product._id}`}
                      >
                        View Product
                      </Link>
                    )}
                    {product.status === 'available' && (
                      <>
                        <div className='mt-2'>
                          <select
                            id='auctionSelect'
                            className='form-control'
                            onChange={(e) => setSelectedAuction(e.target.value)}
                          >
                            <option value='' disabled selected>
                              Select an Auction
                            </option>
                            {availableAuctions.map((auction) => (
                              <option key={auction._id} value={auction._id}>
                                {auction.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          className='btn btn-primary'
                          onClick={() => handleListProduct(product._id)}
                        >
                          List Product
                        </button>
                      </>
                    )}
                    {(auth.user.userData.user_type === 'admin' ||
                      auth.user.userData._id === product.seller._id) &&
                      ['live', 'available'].includes(product.status) && (
                        <button
                          className='btn btn-danger m-2'
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
