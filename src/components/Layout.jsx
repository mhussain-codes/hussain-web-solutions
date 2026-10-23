import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { pathname, hash } = useLocation();
  const [transitionStage, setTransitionStage] = useState("page-enter-active");

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
    setTransitionStage("page-enter");
    const timer = setTimeout(() => {
      setTransitionStage("page-enter-active");
    }, 40);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return (
    <div className="flex flex-col min-h-screen bg-[#070814] text-slate-100 selection:bg-violet-600/30 selection:text-white">
      <Header />
      <main className={`flex-grow ${transitionStage}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
