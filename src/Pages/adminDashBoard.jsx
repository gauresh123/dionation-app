import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchEvents } from './../Redux/Actions/eventActions';
import AdminEventList from '../Components/Events/adminEventList';
import Volunteer from '../Components/Volunteer/Volunteer';
import Donor from '../Components/Donors/Donors';
import { baseURL } from '../../config';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('events');
  const [volunteers, setVolunteers] = useState([]);
  const [donors, setDonors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  useEffect(() => {
    fetchDonors();
  }, []); 

  // volunteers fetch direct without using redux
  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/volunteers`);
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers', error);
    }
  };

  // donors fetch direct without using redux
  const fetchDonors = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/donations`);
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    marginTop: '120px'
  };

  const dashboardStyle = {
    width: '80%',
    maxHeight: '90vh',
    backgroundColor: '#038112',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    ...(window.innerWidth <= 768 ? { flexDirection: 'column', width: '95%', padding: '10px' } : {}),
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#7fad80',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '8px 0 0 8px',
    ...(window.innerWidth <= 768 ? { width: '100%', borderRadius: '8px 8px 0 0', padding: '10px' } : {}),
  };

  const sidebarTitleStyle = {
    marginBottom: '20px',
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const menuStyle = {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  };

  const menuItemStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #34495e',
    ...(window.innerWidth <= 480 ? { padding: '8px 16px' } : {}),
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    ...(window.innerWidth <= 768 ? { width: '100%', padding: '10px' } : {}),
    ...(window.innerWidth <= 480 ? { padding: '8px' } : {}),
  };

  return (
    <div style={containerStyle}>
      <div className="admin-dashboard" style={dashboardStyle}>
        <div style={sidebarStyle}>
          <div style={sidebarTitleStyle}>CareClub Admin</div>
          <ul style={menuStyle}>
            <li onClick={() => setActiveSection('events')} style={menuItemStyle}>Events</li>
            <li onClick={() => setActiveSection('volunteer')} style={menuItemStyle}>Volunteers</li>
            <li onClick={() => setActiveSection('donors')} style={menuItemStyle}>Donors</li>
          </ul>
        </div>
        <div className="content" style={contentStyle}>
          {activeSection === 'events' && <AdminEventList />}
          {activeSection === 'volunteer' && <Volunteer volunteers={volunteers} />}
          {activeSection === 'donors' && <Donor donors={donors} />} 
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
