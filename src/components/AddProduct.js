import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';

const AddProduct = () => {
  const auth = useAuth();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    minimumBidAmount: '',
    files: [],
  });
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('seller', auth.user.userData._id);
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('minimumBidAmount', productData.minimumBidAmount);
    console.log(formData);
    if (productData.files?.length > 0) {
      for (const image of productData.files) {
        formData.append('files', image);
      }
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/product/create',
        formData,
        {
          headers: {
            Authorization: auth.user.token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error creating product:', error.message);
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <p>{message}</p>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
              <label htmlFor='description'>Description</label>
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
            <div className='form-group'>
              <label htmlFor='images'>Upload Images</label>
              <input
                type='file'
                className='form-control-file'
                id='files'
                name='files'
                onChange={handleChange}
                multiple
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
