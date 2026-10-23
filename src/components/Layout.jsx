import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StarBackground from './StarBackground';

const Layout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="flex flex-col min-h-screen bg-[#030014] text-slate-100 overflow-x-hidden selection:bg-purple-600/30 selection:text-white relative">
      <StarBackground />
      <Header />
      <main className="flex-grow z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
