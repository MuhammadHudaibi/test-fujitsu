import React from 'react';

const Loader = ({ small }) => {
  const size = small ? 'h-5 w-5' : 'h-12 w-12';
  return (
    <div className={`animate-spin rounded-full ${size} border-t-2 border-b-2 border-blue-500 mx-auto`}></div>
  );
};

export default Loader;