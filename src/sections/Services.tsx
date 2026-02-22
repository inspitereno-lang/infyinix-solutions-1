import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Lightbulb, Code2, Palette, Server, Shield, Blocks } from 'lucide-react';
import Magnetic from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0a0f1a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 152, 236, 0.1), transparent 40%)`,
        }}
      />

      {/* Sub-border highlight following mouse */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.05)`,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          zIndex: 1
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Recessed Icon Well */}
        <div className="w-14 h-14 bg-[#050B14] rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/5 group-hover:border-[#3898EC]/30 transition-colors duration-500 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3898EC]/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
          <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#3898EC] transition-colors duration-500 relative z-10" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-400 text-base leading-relaxed font-light mb-8 flex-grow">
          {description}
        </p>

        {/* Action Link */}
        <div className="flex items-center gap-3 text-sm font-semibold text-white/50 group-hover:text-white transition-colors duration-300 mt-auto">
          <span>Explore Service</span>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#3898EC] group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Lightbulb,
      title: 'Application Engineering',
      description: 'Architecting resilient, large-scale custom applications with intuitive interfaces and seamless cloud-native integrations.',
    },
    {
      icon: Code2,
      title: 'AI & Machine Learning',
      description: 'Deploying sophisticated AI models to automate workflows, uncover deep insights, and build truly intelligent products.',
    },
    {
      icon: Shield,
      title: 'Cloud & Infrastructure',
      description: 'Designing highly secure, scalable, and autonomous cloud environments that guarantee business continuity.',
    },
    {
      icon: Server,
      title: 'Data Architecture',
      description: 'Transforming massive, messy data lakes into structured, actionable intelligence hubs using modern data platforms.',
    },
    {
      icon: Palette,
      title: 'Experience Design (UX/UI)',
      description: 'Fusing deep psychological principles with high-end aesthetic execution to create platform experiences that convert.',
    },
    {
      icon: Blocks,
      title: 'Platform Modernization',
      description: 'Breaking down legacy monoliths into agile, microservice-driven platforms ready for the next decade of scale.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use gsap.matchMedia for responsive ScrollTriggers
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Pin the left column on desktop while right column scrolls
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: false,
        });
      });

      // Entrance animation for sticky left column
      gsap.fromTo(
        stickyRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#050B14] w-full pt-20 pb-20 lg:pt-32 lg:pb-32"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `radial-gradient(#3898EC 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">

        {/* Editorial Split Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">

          {/* Left Sticky Column */}
          <div className="w-full lg:w-[40%] flex-shrink-0" >
            <div ref={stickyRef} className="lg:h-screen lg:flex lg:flex-col lg:justify-center lg:-mt-20">

              {/* Pill */}
              <div ref={pillRef} className="inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-full mb-6 sm:mb-8 w-fit shrink-0 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-300 tracking-wide uppercase">
                  Service Offerings
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8 tracking-tight leading-[1.1]">
                End-to-end capabilities <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">at scale.</span>
              </h2>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-400 leading-relaxed font-light mb-10 max-w-md">
                We don't just write code. We architect strategic platforms that drive measurable business outcomes, transforming complex challenges into elegant digital solutions.
              </p>

              {/* CTA link */}
              <Magnetic strength={0.2}>
                <a href="#contact" className="group inline-flex items-center gap-4 text-white hover:text-[#3898EC] transition-colors duration-300">
                  <span className="text-lg font-semibold tracking-wide border-b border-transparent group-hover:border-[#3898EC] transition-colors pb-1">Discuss your needs</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#3898EC] transition-colors">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </Magnetic>

            </div>
          </div>

          {/* Right Scrolling Grid */}
          <div className="w-full lg:w-[60%] lg:py-32">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
