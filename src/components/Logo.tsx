
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.923 2.083L1.923 30.083H6.641L23.641 2.083H18.923Z" fill="#1677FF" />
          <path d="M33.923 2.083L27.923 12.083L25.513 8.083L30.795 0.083L38.641 0.083L23.641 24.083L18.923 24.083L28.833 8.083L33.923 2.083Z" fill="#1677FF" />
        </svg>
        <div className="ml-2">
          <div className="font-bold text-[#1677FF] text-xl tracking-wide">Alea</div>
          <div className="uppercase text-[10px] tracking-wider text-[#1677FF]/80">RESEARCH</div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
