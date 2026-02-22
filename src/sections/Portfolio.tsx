import { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyLoad } from '@/hooks/useLazyLoad';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    year: '2024',
    image: '/portfolio-1.jpg',
    description: 'A full-featured e-commerce platform with real-time inventory management.',
  },
  {
    id: 2,
    title: 'AI Analytics Dashboard',
    category: 'AI Solutions',
    year: '2024',
    image: '/portfolio-2.jpg',
    description: 'Machine learning powered analytics platform for enterprise data visualization.',
  },
  {
    id: 3,
    title: 'Fintech Mobile App',
    category: 'Mobile Development',
    year: '2023',
    image: '/portfolio-3.jpg',
    description: 'Secure banking application with biometric authentication and real-time transactions.',
  },
  {
    id: 4,
    title: 'Cloud Infrastructure',
    category: 'DevOps',
    year: '2023',
    image: '/portfolio-4.jpg',
    description: 'Enterprise cloud migration and Kubernetes orchestration solution.',
  },
];

export default function Portfolio() {
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
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-[#1F6FE5]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-16">
          <div>
            <span className="animate-item text-[#1F6FE5] text-xs sm:text-sm font-semibold tracking-wider uppercase opacity-0">
              Our Portfolio
            </span>
            <h2 className="animate-item text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-3 sm:mt-4 opacity-0">
              Featured <span className="text-gradient-orange">Projects</span>
            </h2>
          </div>
          <p className="animate-item text-gray-400 max-w-md mt-3 sm:mt-4 lg:mt-0 lg:text-right text-sm sm:text-base opacity-0">
            Explore our latest work and see how we have helped businesses transform their digital presence.
          </p>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="relative opacity-0">
          {/* Cards Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="relative rounded-2xl overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-[250px] sm:h-[300px] lg:h-[400px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent opacity-80" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#1F6FE5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="text-[#F97316] text-xs sm:text-sm font-medium">
                          {project.category}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm">•</span>
                        <span className="text-gray-400 text-xs sm:text-sm">{project.year}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 max-w-xl">
                        {project.description}
                      </p>

                      {/* View Project Button */}
                      <button className="flex items-center gap-2 text-[#1F6FE5] font-medium text-sm sm:text-base group/btn">
                        View Project
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>

                    {/* Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/10 group-hover:border-[#1F6FE5]/30 transition-colors duration-300 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-6 sm:w-8 bg-[#F97316]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
