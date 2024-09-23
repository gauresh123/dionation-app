import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <div className="fixed top-0 w-full h-[80px] flex justify-between items-center px-4 bg-white text-[#038112]">
     <Link to="/">
     <img src={logo} alt="Logo" className="w-[100px] h-[100px] mr-auto" />
     </Link>
      <div className="hidden md:flex items-center justify-center flex-grow">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/events" smooth={true} duration={500}>
              Events
            </Link>
          </li>
          <li>
            <Link to="/about" smooth={true} duration={500}>
              About
            </Link>
          </li>
          <li>
            <Link to="/join" smooth={true} duration={500}>
              Get Involved
            </Link>
          </li>
        </ul>
      </div>
      <Link to="/donate" smooth={true} duration={500}>
      <button className="hidden md:block bg-[#038112] text-white px-4 py-2 rounded-full ml-auto">
        Donate
      </button>
      </Link>
      <div onClick={handleClick} className="md:hidden z-10 p-2 rounded text-[#038112]">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      
      {/* in small screen size */}
      <ul className={`${!nav ? 'hidden' : 'absolute top-[80px] left-0 w-full h-screen bg-[#038112] flex flex-col items-center justify-center text-white'}`}>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/events" smooth={true} duration={500}>
            Events
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/About" smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/join" smooth={true} duration={500}>
            Get Involved
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
