import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './sections/Header';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import AIProductDevelopment from './sections/AIProductDevelopment';
import Services from './sections/Services';
import Industries from './sections/Industries';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AIChatWidget from './components/AIChatWidget';
import SmoothScroll from './components/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    ScrollTrigger.defaults({
      markers: false,
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-infynix-blue text-white overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Stats />
          <AIProductDevelopment />
          <Services />
          <Industries />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <AIChatWidget />
      </div>
    </SmoothScroll>
  );
}

export default App;
