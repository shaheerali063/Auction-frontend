import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { ProductCard } from './ProductCard';

const AuctionPage = () => {
  const auth = useAuth();
  const { id } = useParams() || 0;
  const [products, setProducts] = useState(null);
  const [seller, setSeller] = useState(null);
  const [bids, setBids] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/auctions/${id}/products`, {
          headers: { Authorization: auth.user.token },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setProducts(response.data.data.products);
            // getBids();
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  // const getBids = async () => {
  //   try {
  //     await axios
  //       .get('http://localhost:5000/api/users/product-bids', {
  //         headers: { Authorization: auth.user.token },
  //       })
  //       .then((response) => {
  //         if (response.data.success) {
  //           setProducts(response.data.data.product);
  //           setSeller(response.data.data.seller);
  //         }
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <>
      <h1 className='text-center mb-5 mt-5'>Products</h1>
      <div className='container'>
        <div className='row'>
          {products &&
            products.map((product, index) => (
              <div className='col-md-4 mb-3' key={index}>
                <ProductCard product={product} auth={auth} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AuctionPage;
