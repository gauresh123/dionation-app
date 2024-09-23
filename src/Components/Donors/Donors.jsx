import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../config';

const Donor = () => {
  const [donors, setDonors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 4;

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/donations`);
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors', error);
      }
    };

    fetchDonors();
  }, []);

  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = donors.slice(indexOfFirstDonor, indexOfLastDonor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(donors.length / donorsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', maxHeight: '100%', overflowY: 'auto' }}>
      <h1 style={{ color: 'black' }}>Donors</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>Phone Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>Place</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black', backgroundColor: '#7fad80' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentDonors.map((donor) => (
            <tr key={donor._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{donor.Name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{donor.PhoneNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}>{donor.Place}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '14px' }}> ₹ {donor.Amount}/-</td>
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
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#038112')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#7fad80')}
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

export default Donor;
