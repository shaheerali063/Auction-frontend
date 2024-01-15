import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';

export const Navbar = () => {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
  };

  return auth.user ? (
    <nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-between'>
      <NavLink className='navbar-brand' to='/auctions'>
        Auction House
      </NavLink>

      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav mr-auto'>
          {auth.user.userData.user_type !== 'admin' && (
            <li className='nav-item active'>
              <NavLink className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </NavLink>
            </li>
          )}
          <li className='nav-item'>
            <NavLink className='nav-link' to='/products'>
              Explore
            </NavLink>
          </li>

          {auth.user.userData.user_type === 'admin' && (
            <li className='nav-item'>
              <NavLink className='nav-link' to='/admin'>
                Admin
              </NavLink>
            </li>
          )}
        </ul>
        <button
          className='navbar-text nav-link btn btn-outline-dark'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  ) : (
    ''
  );
};
