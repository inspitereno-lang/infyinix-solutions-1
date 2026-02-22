import { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Brain, 
  Cloud, 
  Palette, 
  Shield,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyLoad } from '@/hooks/useLazyLoad';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with cutting-edge technologies. From responsive websites to complex enterprise solutions.',
    features: ['React & Next.js', 'Node.js Backend', 'API Development', 'E-commerce'],
    color: '#1F6FE5'
  },
  {
    id: 2,
    icon: Brain,
    title: 'AI Solutions',
    description: 'Harness the power of artificial intelligence to automate processes and create intelligent applications.',
    features: ['Machine Learning', 'NLP & Chatbots', 'Computer Vision', 'Predictive Analytics'],
    color: '#F97316'
  },
  {
    id: 3,
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'End-to-end cloud services including migration, architecture design, and DevOps implementation.',
    features: ['AWS & Azure', 'Kubernetes', 'CI/CD Pipelines', 'Serverless'],
    color: '#1F6FE5'
  },
  {
    id: 4,
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality for delightful experiences.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: '#F97316'
  },
  {
    id: 5,
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect your digital assets with comprehensive security solutions and monitoring.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Monitoring'],
    color: '#1F6FE5'
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: sectionRef, isVisible } = useLazyLoad<HTMLElement>({ threshold: 0.1 });
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll('.service-card'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="services"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1F6FE5]/5 to-transparent pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <span className="animate-item text-[#F97316] text-xs sm:text-sm font-semibold tracking-wider uppercase opacity-0">
            Our Services
          </span>
          <h2 className="animate-item text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6 opacity-0">
            Solutions That <span className="text-gradient">Drive Growth</span>
          </h2>
          <p className="animate-item text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg opacity-0">
            From concept to deployment, we offer end-to-end technology services 
            tailored to your business needs.
          </p>
        </div>

        {/* Services Grid - Mobile: Stack, Desktop: Accordion */}
        <div
          ref={cardsRef}
          className={`${isMobile ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'flex gap-2 h-[450px] lg:h-[500px]'}`}
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className={`service-card relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isMobile 
                    ? 'bg-[#111111] hover:bg-[#1a1a1a]' 
                    : isActive
                      ? 'flex-[3] bg-gradient-to-br from-[#1F6FE5]/20 to-[#0A0A0A]'
                      : 'flex-1 bg-[#111111] hover:bg-[#1a1a1a]'
                } opacity-0`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
              >
                {/* Border Glow Effect - Desktop only */}
                {!isMobile && (
                  <div
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 pointer-events-none ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${service.color}40, transparent)`,
                      padding: '1px',
                    }}
                  />
                )}

                <div className="relative h-full p-4 sm:p-5 lg:p-6 flex flex-col">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 ${
                      isActive ? 'bg-[#1F6FE5]' : 'bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Content - Show on active or mobile */}
                  <div className={`flex-1 overflow-hidden transition-all duration-300 ${
                    isMobile || isActive ? 'opacity-100 max-h-[300px]' : 'opacity-0 max-h-0'
                  }`}>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-300"
                        >
                          <div
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="flex items-center gap-1.5 sm:gap-2 text-[#F97316] text-xs sm:text-sm font-medium group">
                      Learn More
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  {/* Number indicator - Desktop only */}
                  {!isMobile && (
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white/5">
                      0{index + 1}
                    </div>
                  )}

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 sm:h-1 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                    style={{ backgroundColor: service.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
