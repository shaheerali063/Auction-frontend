import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';

// const products = [
//   {
//     name: 'RODE Lavalier II',
//     price: 29900,
//     category: 'Microphone',
//     description: 'Omnidirectional Microphone (Black)',
//     image:
//       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
//   },
//   {
//     name: 'SanDisk 1TB Extreme',
//     price: 300,
//     category: 'Portable SSD',
//     description: 'Portable SSD V2 (Black)',
//     image:
//       'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg',
//   },
//   {
//     name: 'Canon RF 24-105mm',
//     price: 40000,
//     category: 'Z Lens',
//     description: 'f/2.8 L IS USM Z Lens (Canon RF)',
//     image:
//       'https://st2.depositphotos.com/27223464/47872/i/450/depositphotos_478728548-stock-photo-fujifilm-t200-mirrorless-camera-silver.jpg',
//   },
//   {
//     name: 'Zhiyun M20C RGB LED',
//     price: 9012,
//     category: 'Light',
//     description: '',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLY7ni_lW_dFQp-d_LU1jjZynQ6MjkYFjrmeMe6H2bhAUwvhsBCoNosBmtdqx_CEFrK-g&usqp=CAU',
//   },
//   {
//     name: 'Das OSHO DJI Osmo Pocket 3',
//     price: 3411,
//     category: 'Rec',
//     description: '',
//     image:
//       'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
//   },
//   {
//     name: 'Insta360 Ace Pro',
//     price: 3400,
//     category: 'Insta360 ACE 8K Pro',
//     description: 'Action Camera',
//     image:
//       'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
//   },
//   {
//     name: 'SanDisk Portable SSD',
//     price: 450,
//     category: '',
//     description: '',
//     image:
//       'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
//   },
//   {
//     name: 'Sennheiser Profile USB',
//     price: 780,
//     category: 'Condenser Microphone',
//     description: '',
//     image:
//       'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
//   },
// ];

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
      setMessage(response.data?.message);
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
