import { useState, useEffect, useRef, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyLoad } from '@/hooks/useLazyLoad';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Michael Roberts',
    role: 'CEO',
    company: 'TechVentures Inc.',
    avatar: '/avatar-1.jpg',
    quote: 'Infopark Tech transformed our digital infrastructure completely. Their team delivered a scalable solution that exceeded our expectations.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'DataFlow Systems',
    avatar: '/avatar-2.jpg',
    quote: 'Working with this team was a game-changer for our startup. They built an AI-powered platform that helped us secure Series A funding.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'Product Director',
    company: 'GlobalFin Solutions',
    avatar: '/avatar-3.jpg',
    quote: 'The level of professionalism and technical skill demonstrated by Infopark Tech is exceptional. They delivered on time with zero compromises.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: sectionRef, isVisible } = useLazyLoad<HTMLElement>({ threshold: 0.1 });
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.animate-item'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      if (sliderRef.current) {
        gsap.fromTo(
          sliderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sliderRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef as React.RefObject<HTMLElement>);

    return () => ctx.revert();
  }, [isVisible]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-[#1F6FE5]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-[#F97316]/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <span className="animate-item text-[#1F6FE5] text-xs sm:text-sm font-semibold tracking-wider uppercase opacity-0">
            Testimonials
          </span>
          <h2 className="animate-item text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6 opacity-0">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="animate-item text-gray-400 max-w-2xl mx-auto text-sm sm:text-base opacity-0">
            Do not just take our word for it. Here is what industry leaders have to say about working with us.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div ref={sliderRef} className="relative max-w-4xl mx-auto opacity-0">
          {/* Main Card */}
          <div className="relative glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[#F97316]/10 flex items-center justify-center">
              <Quote className="w-5 h-5 sm:w-8 sm:h-8 text-[#F97316]" />
            </div>

            {/* Content */}
            <div className="relative min-h-[200px] sm:min-h-[180px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0 relative'
                      : 'opacity-0 absolute inset-0 translate-x-4 pointer-events-none'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F97316] text-[#F97316]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed mb-6 sm:mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#1F6FE5]/30"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-white font-semibold text-sm sm:text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#1F6FE5] to-[#F97316] transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-6 sm:w-8 bg-[#1F6FE5]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
