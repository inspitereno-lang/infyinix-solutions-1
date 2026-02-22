import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized animation - simpler for mobile
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Simpler animations for mobile
      if (isMobile) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        )
          .fromTo(
            subheadingRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          );
      } else {
        // Desktop animations with more effects
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
          .fromTo(
            subheadingRef.current,
            { opacity: 0, y: 30, filter: 'blur(8px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
            '-=0.5'
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
            '-=0.3'
          );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded, isMobile]);

  // Load handler
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Optimized */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Infopark Tech Office"
          className="w-full h-full object-cover"
          loading="eager"
          onLoad={handleImageLoad}
          style={{ willChange: 'transform' }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/50 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]/90" />
      </div>

      {/* Static Gradient Orbs - No mouse tracking for performance */}
      <div className="absolute inset-0 z-[1] opacity-30 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(31, 111, 229, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse-slow 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'pulse-slow 8s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* Simplified Grid - CSS only */}
      <div
        className="absolute inset-0 z-[2] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(31, 111, 229, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 111, 229, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 xl:px-24 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-300">Based in Infopark, Kochi</span>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            Engineering the{' '}
            <span className="text-gradient">Future</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            of Digital{' '}
            <span className="relative">
              Innovation
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <path
                  d="M2 10C50 4 100 4 150 6C200 8 250 4 298 2"
                  stroke="#F97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={subheadingRef}
            className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4 sm:px-0 opacity-0"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            We transform complex challenges into elegant, scalable technology solutions.
            Partner with us to build the infrastructure of tomorrow.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            <Button
              size="lg"
              className="bg-[#1F6FE5] hover:bg-[#1E60C9] text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(31,111,229,0.5)] group w-full sm:w-auto"
            >
              Explore Our Work
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl transition-all duration-300 group w-full sm:w-auto"
            >
              <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" />
              Watch Showreel
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[5]" />
    </section>
  );
}
