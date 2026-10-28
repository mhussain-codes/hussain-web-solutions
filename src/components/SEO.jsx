import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  canonical, 
  type = 'website', 
  image
}) => {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://hussain-web-solutions.vercel.app';
    const finalCanonical = canonical || `${siteUrl}${location.pathname}`;
    const ogImage = image || `${siteUrl}/og-image.jpg`;

    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper to set meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description
    setMetaTag('name', 'description', description);

    // Open Graph Metadata
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', finalCanonical);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', type);

    // Twitter Card Metadata
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

  }, [title, description, canonical, type, image, location.pathname]);

  return null; // This component doesn't render any visible UI
};

export default SEO;
