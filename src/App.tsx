import { useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Lazy load sections for better performance
const Navigation = lazy(() => import('./sections/Navigation'));
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Services = lazy(() => import('./sections/Services'));
const Portfolio = lazy(() => import('./sections/Portfolio'));
const Stats = lazy(() => import('./sections/Stats'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Vision = lazy(() => import('./sections/Vision'));
const CTA = lazy(() => import('./sections/CTA'));
const Footer = lazy(() => import('./sections/Footer'));

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Loading fallback
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#1F6FE5] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Navigation */}
      <Suspense fallback={null}>
        <Navigation />
      </Suspense>

      {/* Main Content */}
      <main>
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Portfolio />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Stats />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Vision />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CTA />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
