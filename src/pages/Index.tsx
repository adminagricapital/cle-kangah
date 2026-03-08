
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import AtelierPreview from '@/components/AtelierPreview';
import Gallery from '@/components/Gallery';
import Skills from '@/components/Skills';
import BoutiquePreview from '@/components/BoutiquePreview';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import ValuFam from '@/components/ValuFam';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <AtelierPreview />
      <Gallery />
      <BoutiquePreview />
      <Skills />
      <Projects />
      <Testimonials />
      <Partners />
      <FAQ />
      <ValuFam />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
