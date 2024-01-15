import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { ProductCard } from './ProductCard';
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

const LIVE_PRODUCTS = 'http://localhost:5000/api/product/live-products';
const Products = () => {
  const auth = useAuth();
  const [products, setProducts] = useState(null);
  const [deleteFlag, setDeleteFlag] = useState(false);

  useEffect(() => {
    getProducts();
    setDeleteFlag(false);
  }, [deleteFlag]);
  const getProducts = async () => {
    try {
      await axios
        .get(LIVE_PRODUCTS, {
          headers: { Authorization: auth.user.token },
        })
        .then((response) => {
          if (response.data.success) setProducts(response.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1 className='text-center mb-5 mt-5'>Products Page</h1>
      <div className='container'>
        <div className='row'>
          {products &&
            products.map((product, index) => (
              <div className='col-md-4 mb-3' key={index}>
                <ProductCard
                  product={product}
                  auth={auth}
                  setDeleteFlag={setDeleteFlag}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
