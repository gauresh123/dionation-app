import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// User
import Home from '../Pages/Home';
import Event from '../Pages/EventPage';
import About from '../Components/About/AboutMore';
import Contact from '../Pages/getInvolved';
import Donate from '../Pages/Donate';
import DonationDetails from '../Pages/DonationDetails';
import PaymentSuccess from '../Components/Payment/PaymentSuccess'; 

// Admin
import AdminLogin from '../Pages/adminLoginPage';
import AdminDashboard from '../Pages/adminDashBoard';
import EventList from '../Components/Admin/AdminEventForm';

// Private Route
import PrivateRoute from '../Components/Admin/PrivateRoute';
import Analytycs from '../Pages/Analytycs';

const stripePromise = loadStripe('pk_test_51PR9glLOHi8b6gLzs6a7Tp7FPwaS1PkB60z9WJun9WgrVWNYvbZsUoOIVmbDa2dPgL8ir1HIiI2qqqKZZPkg99OL00vwFrtpah');

const Routers = () => {
  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);
  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Event />} />
        <Route path='/about' element={<About />} />
        <Route path='/join' element={<Contact />} />
        <Route path='/donate' element={<Donate />} />
        <Route path="/donation-details" element={<DonationDetails/>} />
        <Route path="/analytycs" element={<Analytycs/>} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AdminDashboard />} />} />
        <Route path="/admin/eventlist" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EventList />} />} />
      </Routes>
    </Elements>
  );
};

export default Routers;
