import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased selection:bg-purple-200 selection:text-purple-900">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}