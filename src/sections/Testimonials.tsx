import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Prashob',
      role: 'Business Owner',
      company: 'Tech Zone',
      image: 'https://i.pravatar.cc/150?u=1',
      quote: "Inspite Technologies refined our SEO strategy with surgical precision. Their deep technical knowledge and proactive approach brought us to the first page faster than we ever imagined.",
      rating: 5,
    },
    {
      id: 2,
      name: 'Prathyusha',
      role: 'Growth Lead',
      company: 'Consumer Group',
      image: 'https://i.pravatar.cc/150?u=2',
      quote: "The energy and creativity the team brings is infectious. They didn't just build a website; they built a conversion engine that has fundamentally changed our brand awareness.",
      rating: 5,
    },
    {
      id: 3,
      name: 'Hima R Anand',
      role: 'Project Director',
      company: 'Creative Studio',
      image: 'https://i.pravatar.cc/150?u=3',
      quote: "Blown away by the design concepts. Their ability to fuse aesthetic beauty with functional excellence is rare. They delivered on time, exceeding every single requirement.",
      rating: 5,
    },
    {
      id: 4,
      name: 'Muhammed Shafi',
      role: 'Operations Head',
      company: 'Local Business',
      image: 'https://i.pravatar.cc/150?u=4',
      quote: "Scale and performance are at the heart of what they do. Our digital presence has exploded since we partnered with their Infopark team. Highly recommended!",
      rating: 5,
    },
    {
      id: 5,
      name: 'Ribin B',
      role: 'Founder',
      company: 'Startup Hub',
      image: 'https://i.pravatar.cc/150?u=5',
      quote: "They actually listen. It sounds simple, but their responsiveness and willingness to iterate until perfection is achieved is what sets them apart from the competition.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from('.testimonial-header', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      gsap.from('.testimonial-card', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Floating background orbs
      gsap.to('.bg-orb-test-1', {
        x: '100',
        y: '-50',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.bg-orb-test-2', {
        x: '-100',
        y: '50',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length - 2)) % (testimonials.length - 2));
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-40 w-full overflow-hidden bg-[#050B14]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb-test-1 absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#3898EC]/5 rounded-full blur-[120px]" />
        <div className="bg-orb-test-2 absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="testimonial-header flex flex-col items-center text-center mb-20 lg:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3898EC]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Client Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight max-w-3xl">
            Trusted by the world's most <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3898EC] to-[#60A5FA]">ambitious</span> teams.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl font-light">
            We don't just deliver projects; we build long-term partnerships that drive sustainable growth and technological leadership.
          </p>
        </div>

        {/* Multi-Card Slider Container */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 lg:gap-8 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: `translateX(calc(-${currentIndex * 33.33}%))` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-21px)]"
              >
                <div className="h-full bg-[#0a0f1a]/60 backdrop-blur-xl border border-white/5 p-10 lg:p-12 rounded-[2.5rem] flex flex-col justify-between hover:bg-[#0a0f1a]/80 hover:border-[#3898EC]/30 transition-all duration-500 group shadow-2xl relative overflow-hidden">

                  {/* Stylized Quote Icon */}
                  <div className="absolute top-8 right-8 text-white/5 group-hover:text-[#3898EC]/10 transition-colors duration-500">
                    <Quote className="w-20 h-20 rotate-12" />
                  </div>

                  <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex gap-1 mb-8">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= testimonial.rating ? 'fill-[#EAB308] text-[#EAB308]' : 'text-gray-700'}`} />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="text-gray-300 text-xl lg:text-2xl font-light leading-relaxed mb-12">
                      “{testimonial.quote}”
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="flex items-center gap-5 pt-8 border-t border-white/5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#3898EC]/40 transition-colors">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm font-medium">
                        {testimonial.role} <span className="text-[#3898EC]/60 mx-1">@</span> {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-12 mt-16 lg:mt-24">
            <button
              onClick={prevSlide}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-500 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="flex gap-3">
              {Array.from({ length: testimonials.length - 2 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-[#3898EC]' : 'w-3 bg-white/10 hover:bg-white/20'}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-500 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Global CTA Link */}
        <div className="mt-24 text-center">
          <a
            href="https://inspitetech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
          >
            <span className="text-sm font-bold tracking-widest uppercase">Explore all projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
