import { useState } from 'react'
import './App.css'
import Navbar from './Shared/Navbar'
import Home from './pages/Home'
import Footer from './Shared/Footer'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'
import VerifyOtp from './pages/VerifyOtp'
import Addfood from './pages/admin/Addfood'
import FoodPage from './pages/FoodPage'
import Profile from './pages/Profile'
import ViewCart from './pages/ViewCart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import MyOrder from './pages/MyOrder'
import AllOrder from './pages/admin/AllOrder'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Order from './pages/Order'
import Menu from './pages/Menu'

function App() {
  const [count, setCount] = useState(0)
  const stripePromise=loadStripe('pk_test_51OjeKSSEjk6Xceuuq2z0Bzt3TWtMFIKBd8KlRoXKDx7eHzkhOVGNXATsTYGGY9v05zwZTT7wSTMyzFUcVtzt5Ill00rssL1kzY');

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verifyOtp' element={
          <ProtectedRoute>
            <VerifyOtp />
          </ProtectedRoute>
        } />
        <Route path='/addfood' element={
          <ProtectedRoute>
            <Addfood/>
          </ProtectedRoute>
        } />
        <Route path='/menu' element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        } />
         <Route path='/menu/:id' element={
          <ProtectedRoute>
            <FoodPage/>
          </ProtectedRoute>
        } />
          <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />
         <Route path='/viewcart' element={
          <ProtectedRoute>
            <ViewCart/>
          </ProtectedRoute>
        } />
          <Route path='/success' element={
          <ProtectedRoute>
            <Success/>
          </ProtectedRoute>
        } />
          <Route path='/cancel' element={
          <ProtectedRoute>
            <Cancel/>
          </ProtectedRoute>
        } />
          <Route path='/my-order' element={
          <ProtectedRoute>
         <MyOrder/>
          </ProtectedRoute>
        } />
        <Route path='/all-order' element={
          <ProtectedRoute>
         <AllOrder/>
          </ProtectedRoute>
        } />
          <Route path='/order' element={
          <ProtectedRoute>
          <Elements stripe={stripePromise}>
            <Order/>
            </Elements>
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
