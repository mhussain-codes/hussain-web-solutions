import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-8xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-400 mb-4">
        404
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
        Page Not Located
      </h1>
      <p className="text-base text-slate-300 mb-10 max-w-md">
        The destination you are attempting to reach has been relocated or no longer exists in the current system.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <HomeIcon size={18} /> Back to Homepage
        </Link>
        <Link to="/work" className="btn-secondary inline-flex items-center gap-2">
          <span>Explore Projects</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
