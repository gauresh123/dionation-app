import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent, fetchEvents } from './../../Redux/Actions/eventActions';
import { FaTrash } from 'react-icons/fa';
import EventForm from './../Events/EventForm'; 

const AdminEventList = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const eventsState = useSelector((state) => state.events);
  const { events, loading, error } = eventsState || { events: [], loading: false, error: null };

  const handleDelete = (eventId, eventTitle) => {
    if (window.confirm(`Are you sure you want to delete the event "${eventTitle}"?`)) {
      dispatch(deleteEvent(eventId));
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to render events as a table row
  const renderEvents = () => {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Place</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Image</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map(event => (
            <tr key={event._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px', textAlign: 'left' }}>{event.title}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{event.description}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{event.place}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{new Date(event.date).toLocaleDateString()}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>
                <img src={event.imageUrl} alt={event.title} style={{ maxWidth: '40px', maxHeight: '40px', objectFit: 'cover' }} />
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button onClick={() => handleDelete(event._id, event.title)} style={{ marginRight: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <FaTrash style={{ color: 'red', fontSize: '18px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Pagination control buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', maxHeight: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setShowEventForm(true)}
          style={{ padding: '10px 20px', backgroundColor: '#7fad80', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Create New Event
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>Error loading events: {error}</p>
      ) : showEventForm ? (
        <EventForm setShowEventForm={setShowEventForm} />
      ) : (
        <div>
          <h1>Events</h1>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div>
              {renderEvents()}
              <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {pageNumbers.map(number => (
                  <li key={number} style={{ margin: '0 10px' }}>
                    <button  onClick={() => paginate(number)} style={{ padding: '10px', backgroundColor: '#7fad80', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminEventList;
