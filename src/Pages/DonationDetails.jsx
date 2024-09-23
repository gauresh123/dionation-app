import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../Components/Payment/PaymentForm';

const DonationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    navigate('/donate');
    return null;
  }
  const { formData } = location.state;

  return (
    <div className="container mx-auto pt-[140px]">
      <h2 className="text-2xl mb-4 font-bold">Donation Details</h2>
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 space-y-2" style={{borderRadius: '4px', border: '1px solid #038112' }}>
          <p><strong>Name:</strong> {formData.Name}</p>
          <p><strong>Phone Number:</strong> {formData.PhoneNumber}</p>
          <p><strong>Place:</strong> {formData.Place}</p>
          <p><strong>Amount:</strong> ${formData.Amount}</p>
        </div>
        <div className="flex-1 mt-2 md:mt-0" style={{borderRadius: '4px', border: '1px solid #038112' }}>
         
          <PaymentForm amount={formData.Amount} />
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
