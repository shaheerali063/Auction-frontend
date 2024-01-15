import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, auth, setDeleteFlag }) => {
  function truncateDescription(description, maxLength) {
    if (description?.length <= maxLength) {
      return description;
    } else {
      return description.slice(0, maxLength) + '...';
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/delete/${product._id}`,
        {
          headers: { Authorization: auth.user.token },
        }
      );
      if (response.data.success) {
        setDeleteFlag(true);
      }
    } catch (error) {}
  };
  return (
    <div className='card'>
      <img
        src={product.images[0]?.url}
        className='card-img-top'
        alt={product.name}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className='card-body' style={{ minHeight: '200px' }}>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-text'>
          {truncateDescription(product.description, 40)}{' '}
        </p>

        <p className='card-text'>
          Current bid Price: Rs {product.currentBid ? product.currentBid : 0}
        </p>

        <Link className='btn btn-primary' to={`/product/${product._id}`}>
          {auth.user.userData.user_type === 'buyer'
            ? 'Submit Bid'
            : 'View Product'}
        </Link>
        {(auth.user.userData.user_type === 'admin' ||
          auth.user.userData._id === product.seller) && (
          <Link
            className='btn btn-success ml-2'
            to={`/update-product/${product._id}`}
          >
            Update
          </Link>
        )}
        {(auth.user.userData.user_type === 'admin' ||
          auth.user.userData._id === product.seller) &&
          ['live', 'available'].includes(product.status) && (
            <button className='btn btn-danger ml-2' onClick={handleDelete}>
              Delete
            </button>
          )}
      </div>
    </div>
  );
};
