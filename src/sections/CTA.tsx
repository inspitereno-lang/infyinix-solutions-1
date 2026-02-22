import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyLoad } from '@/hooks/useLazyLoad';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const { ref: sectionRef, isVisible } = useLazyLoad<HTMLElement>({ threshold: 0.1 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll('.animate-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef as React.RefObject<HTMLElement>);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 w-full overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111827] to-[#0A0A0A]" />

      {/* Static Orb - No animation for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px]">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(31, 111, 229, 0.15) 0%, rgba(249, 115, 22, 0.08) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Secondary Glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        <div ref={contentRef} className="max-w-3xl sm:max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-item inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass mb-6 sm:mb-8 opacity-0">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#F97316]" />
            <span className="text-xs sm:text-sm text-gray-300">Start Your Journey</span>
          </div>

          {/* Heading */}
          <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight opacity-0">
            Ready to Build
            <br />
            the <span className="text-gradient">Future?</span>
          </h2>

          {/* Subtext */}
          <p className="animate-item text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 opacity-0">
            Let us transform your ideas into reality. Partner with us and experience 
            the difference that true technical excellence can make.
          </p>

          {/* CTA Button */}
          <div className="animate-item opacity-0">
            <Button
              size="lg"
              className="relative bg-[#F97316] hover:bg-[#1F6FE5] text-white px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-xl transition-all duration-500 group overflow-hidden w-full sm:w-auto"
            >
              {/* Button Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#EA580C] opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F6FE5] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative flex items-center justify-center gap-2">
                Start Your Project
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-item mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 text-gray-500 text-xs sm:text-sm opacity-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
              Free Consultation
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
              24/7 Support
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
              NDA Protected
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
