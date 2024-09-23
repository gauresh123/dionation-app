import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../config';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/doue07abb/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'CareClub'; 

const EventForm = ({ setShowEventForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (title.length > 30) {
      validationErrors.title = 'Title must be 30 characters or less';
    }
    if (description.length > 50) {
      validationErrors.description = 'Description must be 50 characters or less';
    }
    if (place.length > 20) {
      validationErrors.place = 'Place must be 20 characters or less';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (!imageFile) {
        console.error('No file selected');
        return;
      }
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      const cloudinaryResponse = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = cloudinaryResponse.data.secure_url;
      await axios.post(`${baseURL}/api/event/events`, {
        title,
        description,
        place,
        date,
        imageUrl 
      });
      
      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      setPlace('');
      setDate('');
      setImageFile(null);
      setShowEventForm(false); // Close the form after submission
    } catch (error) {
      console.error('Error uploading image or creating event', error.response || error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (max 30 characters)"
         maxLength="30"
        required
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (max 50 characters)"
        maxLength="50"
        required
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Place (max 20 characters)"
        maxLength="20"
        required
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {errors.place && <p style={{ color: 'red' }}>{errors.place}</p>}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        required
      />
      <button className="btn" type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
