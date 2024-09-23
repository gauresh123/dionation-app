import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../config';

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [volunteersPerPage] = useState(4);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/volunteers`);
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers', error);
      }
    };

    fetchVolunteers();
  }, []);


  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(volunteers.length / volunteersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', maxHeight: '100%', overflowY: 'auto' }}>
      <h1 style={{ color: 'black' }}>Volunteers</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>Full Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>Address</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>About yourself</th>
          </tr>
        </thead>
        <tbody>
          {currentVolunteers.map((data) => (
            <tr key={data._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{data.fullName.substring(0, 80)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{data.email.substring(0, 80)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{data.address.substring(0, 80)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px'  }}>{data.subject.substring(0, 80)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', }}>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '5px' }}>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                style={{
                  backgroundColor: '#7fad80',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  padding: '10px 20px',
                }}
                onClick={() => paginate(number)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#038112'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#7fad80'}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Volunteer;
