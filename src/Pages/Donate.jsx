import React, { useState } from 'react';
import AboutImg from '../../src/assets/donate1.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../config';

const Donate = () => {
  const [formData, setFormData] = useState({
    Name: '',
    PhoneNumber: '',
    Place: '',
    Amount: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Name, PhoneNumber, Place, Amount } = formData;

    if (!Name.trim() || !PhoneNumber.trim() || !Place.trim() || !Amount.trim()) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    if (Name.length < 3) {
      setErrorMessage('Name must be at least 3 characters.');
      return;
    }
    if (Name.length > 25) {
      setErrorMessage('Full Name must be less than 25 characters.');
      return;
    }
    if (PhoneNumber.length !== 10 || isNaN(PhoneNumber)) {
      setErrorMessage('Phone Number must be exactly 10 numeric characters.');
      return;
    }
    if (Place.length < 3) {
      setErrorMessage('Place must be at least 3 characters.');
      return;
    }
    if (Place.length > 25) {
      setErrorMessage('Place must be less than 25 characters.');
      return;
    }
    if (isNaN(Amount)) {
      setErrorMessage('Amount must be in numeric format.'); 
      return;
    }
    try {
      await axios.post(`${baseURL}/api/donations`, formData);
      setFormData({ Name: '', PhoneNumber: '', Place: '', Amount: '' });
      setErrorMessage('');
      navigate('/donation-details', { state: { formData } });
    } catch (error) {
      console.error('Error making donation', error);
      alert('Failed to make donation. Please try again later.');
    }
  };

  return (
    <section className="pt-[140px] 2xl:h-[800px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[30px] items-center justify-between">
          <div className="flex-1 flex justify-center">
            <img src={AboutImg} alt="" className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <div className="px-4 mx-auto max-w-screen-md">
              <form className="space-y-8 mt-1 hero__section" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="form__label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="Name"
                    className="form__input mt-1"
                    value={formData.Name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="form__label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="PhoneNumber"
                    className="form__input mt-1"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="place" className="form__label">
                    Place
                  </label>
                  <input
                    type="text"
                    id="place"
                    name="Place"
                    className="form__input mt-1"
                    value={formData.Place}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="amount" className="form__label">
                    Amount (₹)
                  </label>
                  <input
                    type="text"
                    id="amount"
                    name="Amount"
                    className="form__input mt-1"
                    value={formData.Amount}
                    onChange={handleChange}
                  />
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button type="submit" className="btn rounded sm:w-fit">
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
