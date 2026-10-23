import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          {/* Public Website Routes wrapped in Main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:id" element={<ProjectDetails />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Hidden Admin Management Portal (No public header/footer) */}
          <Route path="admin" element={<Admin />} />
        </Routes>
        <Chatbot />
      </Router>
    </ContentProvider>
  );
}

export default App;
