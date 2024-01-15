import React from 'react';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { Navbar } from './components/Navbar';
import Signup from './components/Signup';
import Home from './components/Home';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import AuctionListing from './components/AuctionListing';
import AuctionPage from './components/AuctionPage';
import { AuthProvider } from './context/auth';
import RequireAuth from './utils/RequireAuth';
import AddProduct from './components/AddProduct';
import Error from './components/Error';
import AddAuction from './components/AddAuction';
import { Admin } from './components/Admin';
import ProductReport from './components/ProductReport';
import AuctionReport from './components/AuctionReport';
import UpdateProduct from './components/UpdateProduct';
import SellerProductReport from './components/SellerProductReport';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth>
                  <Home />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/add-product'
              element={
                <RequireAuth allowedRoles={['seller']}>
                  <AddProduct />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/add-auction'
              element={
                <RequireAuth allowedRoles={['seller', 'admin']}>
                  <AddAuction />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/admin'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <Admin />{' '}
                </RequireAuth>
              }
            />

            <Route
              path='/admin-product-report'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <ProductReport />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/seller-product-report'
              element={
                <RequireAuth allowedRoles={['seller']}>
                  <SellerProductReport />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/admin-auction-report'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <AuctionReport />{' '}
                </RequireAuth>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/error' element={<Error />} />

            <Route
              path='/products'
              element={
                <RequireAuth>
                  <Products />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/product/:id'
              element={
                <RequireAuth>
                  <ProductPage />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/auctions'
              element={
                <RequireAuth>
                  <AuctionListing />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/auction/:id'
              element={
                <RequireAuth>
                  <AuctionPage />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='/update-product/:id'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <UpdateProduct />{' '}
                </RequireAuth>
              }
            />
            <Route
              path='admin/update-user/:id'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <UpdateUser />{' '}
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
