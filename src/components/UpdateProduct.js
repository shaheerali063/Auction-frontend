import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';

const UpdateProduct = () => {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    minimumBidAmount: 0,
    status: 'available',
  });

  useEffect(() => {
    // Fetch product details when the component mounts
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/show/${id}`,
          { headers: { Authorization: auth.user.token } }
        );
        if (response.data.success) {
          setProductData(response.data.data.product);
        } else {
          // Handle error or redirect to a 404 page
          console.error(
            'Error fetching product details:',
            response.data.message
          );
        }
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/update/${id}`,
        productData,
        { headers: { Authorization: auth.user.token } }
      );

      if (response.data.success) {
        navigate(`/product/${id}`);
      } else {
        console.error('Error updating product:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Update Product</h1>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Product Name</label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={productData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Product Description</label>
              <textarea
                className='form-control'
                id='description'
                name='description'
                value={productData.description}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='minimumBidAmount'>Minimum Bid Amount</label>
              <input
                type='number'
                className='form-control'
                id='minimumBidAmount'
                name='minimumBidAmount'
                value={productData.minimumBidAmount}
                onChange={handleChange}
                required
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
