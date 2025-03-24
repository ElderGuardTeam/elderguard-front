// Loader.js
import React, { useEffect } from 'react';
import { useLoader } from '@/contexts/loaderContext';

const Loader: React.FC = () => {
  const { loading } = useLoader(); 

  const style = {
    zIndex: 9999999,
    display: loading ? 'flex' : 'none', 
  };
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]); 
  if (!loading) return null;

  return (
    <div
      id="loader"
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-gray-600/50  backdrop-blur-sm select-none"
      style={style}
    >
      <span className="loading loading-spinner text-accent loading-lg"></span>
    </div>
  );
};

export default Loader;
