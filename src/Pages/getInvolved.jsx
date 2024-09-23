import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    subject: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, address, subject } = formData;

    if (!fullName.trim() || !email.trim() || !address.trim() || !subject.trim()) {
      setErrorMessage('Please fill the form!');
      return;
    }
    if (fullName.length < 5) {
      setErrorMessage('Full Name Must be at least 5 characters.');
      return;
    }
    if (fullName.length > 25) {
      setErrorMessage('Full Name must be less than 25 characters');
      return;
    }
    if (address.length < 10) {
      setErrorMessage(' Address must be at least 10 characters.');
      return;
    }
    if (address.length > 60) {
      setErrorMessage('Address must be less than 60 characters');
      return;
    }
    if (subject.length < 10) {
      setErrorMessage('About yourself Must be at least 10 characters.');
      return;
    }
    try {
      await axios.post(`${baseURL}/api/send-email`, formData);
      await axios.post(`${baseURL}/api/volunteers`, formData);
      setFormData({ fullName: '', address: '', email: '', subject: '' });
      setErrorMessage('');
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form. Please try again later.');
    }
  };

  return (
    <section className='pt-[160px]'>
      <div className='container'>
        <div className='px-4 mx-auto max-w-screen-md '>
          <h2 className='heading text-center'>Thank you for your interest in volunteering!</h2>
          <form className='space-y-8 mt-1 hero__section' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='fullName' className='form__label'>
                Full Name
              </label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                className='form__input mt-1'
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='address' className='form__label'>
                Address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                className='form__input mt-1'
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='email' className='form__label'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='example@gmail.com'
                className='form__input mt-1'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='sm:col-span-2'>
              <label htmlFor='subject' className='form__label'>
                About yourself
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                className='form__input mt-1'
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            <button type='submit' className='btn rounded sm:w-fit'>
              Join
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
