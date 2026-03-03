
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import AtelierPreview from '@/components/AtelierPreview';
import Projects from '@/components/Projects';
import Gallery from '@/components/Gallery';
import BoutiquePreview from '@/components/BoutiquePreview';
import ValuFam from '@/components/ValuFam';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <AtelierPreview />
      <Projects />
      <Gallery />
      <BoutiquePreview />
      <ValuFam />
      <Testimonials />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
