import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyLoad } from '@/hooks/useLazyLoad';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const { ref: sectionRef, isVisible } = useLazyLoad<HTMLElement>({ threshold: 0.1 });
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current.querySelectorAll('.word'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef as React.RefObject<HTMLElement>);

    return () => ctx.revert();
  }, [isVisible]);

  const quoteWords = 'Innovation is not just about technology; it is about creating value that lasts.'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 w-full overflow-hidden"
    >
      {/* Background Orb - Static, no animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px]">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(31, 111, 229, 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Secondary Glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        <div ref={quoteRef} className="max-w-4xl sm:max-w-5xl mx-auto text-center">
          {/* Label */}
          <span className="text-[#F97316] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8 block">
            Our Vision
          </span>

          {/* Quote */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8">
            {quoteWords.map((word, index) => (
              <span
                key={index}
                className={`word inline-block mr-[0.25em] opacity-0 ${
                  word === 'Innovation' || word === 'value' || word === 'lasts.'
                    ? 'text-gradient'
                    : ''
                }`}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Accent Line */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#1F6FE5] to-[#F97316] rounded-full" />
          </div>

          {/* Subtext */}
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl sm:max-w-2xl mx-auto">
            This philosophy drives every project we undertake, every solution we build, 
            and every relationship we nurture.
          </p>
        </div>
      </div>

      {/* Decorative Elements - Static */}
      <div className="absolute top-16 left-16 sm:top-20 sm:left-20 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1F6FE5] opacity-60" />
      <div className="absolute bottom-16 right-16 sm:bottom-20 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#F97316] opacity-40" />
    </section>
  );
}
