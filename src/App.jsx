import React, { useEffect, useMemo, useState } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import AboutDeepDecors from './components/AboutDeepDecors';
import WhyChoose from './components/WhyChoose';
import SignatureExperience from './components/SignatureExperience';
import Gallery from './components/Gallery';
import CustomOrders from './components/CustomOrders';
import CustomerReviews from './components/CustomerReviews';
import InstagramGallery from './components/InstagramGallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const sections = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'collections', label: 'Collections' },
      { id: 'about', label: 'About' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'custom-orders', label: 'Custom Orders' },
      { id: 'reviews', label: 'Reviews' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' }
    ],
    []
  );


  return (
    <div className="dd-page">
      {loading ? <LoadingScreen /> : null}

      <a className="dd-skip" href="#home">
        Skip to content
      </a>

      <Navbar sections={sections} />

      <main>
        <Hero />
        <FeaturedCollections />
        <AboutDeepDecors />
        <WhyChoose />
        <SignatureExperience />
        <Gallery />
        <CustomOrders />
        <CustomerReviews />
        <InstagramGallery />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

