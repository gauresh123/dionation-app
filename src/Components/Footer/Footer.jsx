import React from 'react';

const Footer = () => {
  return (
    <footer className='pb-10 pt-5' >
      <div className='container'>
        <div className='flex justify-between flex-col flex-wrap gap-[30px]' >
          <div>
            <p className='text-[14px] leading-6  font-semibold text-textColor text-center'>
              © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer