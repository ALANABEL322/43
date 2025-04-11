import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
      {/* Add more navigation links here */}
    </div>
  );
};

export default NavLinks;
