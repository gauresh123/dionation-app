import React from 'react';
import About from '../Components/About/About';
import Banner from '../../src/assets/charityBanner1.png';
import EventPage from './../Pages/EventPage';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center height: auto bg-gray-100">
      <div className="w-full ">
        <img src={Banner} alt="Charity Banner" className="w-full h-auto object-cover" />
        <About />
        <EventPage />
      </div>
    </div>
  );
}

export default Home;
