import React from 'react';
import AboutImg from '../../assets/donate.jpg';
import { Link } from 'react-router-dom';

const About = () => {
    return <section className=' pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
            <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
                {/* hero images */}
                <div className='flex gap-[30px] justify-end'>
                    <div>
                        <img src={AboutImg} alt=""  />
                    </div>
                </div>
                {/* hero content */}
                <div>
                    <div className='lg:w-[570px] '>
                        <h2 className='heading'>
                            Who are we?</h2>
                        <p className='text_para '>We are a passionate team dedicated to making a difference in the world. Committed to serving communities in need, we leverage expertise in education, healthcare, and sustainable development to drive positive change. Together with our supporters, we work tirelessly to create a brighter, more equitable future for all.</p>
                        <button className='btn'> <Link to='/about'> Discover More</Link></button>
                    </div>
                </div>

            </div>
        </div>
    </section>

}

export default About