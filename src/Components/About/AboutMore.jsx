import React from 'react';
import AboutImg from './../../assets/CharityMission.jpg';
import { FaWater, FaHeartbeat, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Donate from '../../Pages/Donate';

const AboutMore = () => {
  const sections = [
    {
      title: 'Pure Food & Water',
      description: 'Ensuring access to clean water and nutritious food for impoverished communities. We focus on sustainable practices to create lasting solutions, empowering resilience for a future free from hunger and thirst.',
      icon: <FaWater size={50} />, 
    },
    {
      title: 'Health & Medicine',
      description: 'Charity organizations in Health & Medicine champion accessibility, research, and support for those in need. Their tireless efforts advance healthcare, fund vital research, and provide crucial aid, ensuring a healthier future for all.',
      icon: <FaHeartbeat size={50} />,
    },
    {
      title: 'Education',
      description: 'Charity organizations in education empower communities by providing access to quality learning opportunities, resources, and support for students in need. Through advocacy and fundraising efforts, they strive to create a brighter future through education for all.',
      icon: <FaBook size={50} />, 
    },
  ];

  return (
    <section className='pt-[140px] 2xl:h-[800px]'>
      <div>
        {/* About Section */}
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/* Hero Images */}
            <div className='flex gap-[30px] justify-end'>
              <div>
                <img src={AboutImg} alt="About Us" />
              </div>
            </div>
            {/* Hero Content */}
            <div>
              <div className='lg:w-[570px]'>
                <h2 className='heading'>Our mission</h2>
                <p className='text_para'>
                Our mission is to foster positive change by empowering underserved communities through education, healthcare, and sustainable development initiatives. Through collaborative partnerships and innovative solutions, we strive to create lasting impact and improve the lives of individuals worldwide, ensuring equitable access to opportunities for all.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* How We Help People Section */}
        <div className='pt-[60px]'>
          <h2 className='heading' style={{ textAlign: 'center', fontSize: '2em' }}>How we help people</h2>
          <div style={{ display: 'flex', justifyContent: 'center', background: '#038112', padding: '20px', gap: '20px' }}>
            {sections.map((section, index) => (
              <div key={index} style={{ flex: 1, textAlign: 'center', color: 'white', padding: '10px' }}>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>{section.icon}</div>
                <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{section.title}</h3>
                <p style={{ fontSize: '1em' }}>{section.description}</p>
              </div>
            ))}
          </div>
          <Donate/>
        </div>
      </div>
    </section>
  );
};

export default AboutMore;
