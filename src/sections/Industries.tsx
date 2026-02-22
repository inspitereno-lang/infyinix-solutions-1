import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';
import {
  Heart,
  Truck,
  ShoppingCart,
  Landmark,
  GraduationCap,
  Server,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Industry {
  icon: LucideIcon;
  name: string;
  description: string;
  color: string;
}

const Industries = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const industries: Industry[] = [
    { icon: Heart, name: 'Healthcare', description: 'Digital health solutions for better patient care, telemedicine, and operational efficiency.', color: '#EF4444' },
    { icon: Landmark, name: 'Finance', description: 'Secure fintech solutions, banking platforms, and fraud detection systems.', color: '#14B8A6' },
    { icon: ShoppingCart, name: 'Retail', description: 'Omnichannel retail experiences, inventory management, and e-commerce platforms.', color: '#10B981' },
    { icon: GraduationCap, name: 'Education', description: 'Modern e-learning platforms, student management systems, and virtual classrooms.', color: '#84CC16' },
    { icon: Server, name: 'Manufacturing', description: 'Smart factory solutions, IoT integration, and industrial automation systems.', color: '#3B82F6' },
    { icon: Truck, name: 'Transportation', description: 'Fleet management, supply chain optimization, and logistics tracking.', color: '#F59E0B' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        carouselRef.current?.children || [],
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'expo.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [industries.length]);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative py-20 lg:py-32 w-full overflow-hidden bg-[#050B14]"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Continuous Grid Mesh - matches Hero and Services */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `radial-gradient(#3898EC 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

        {/* Artistic Glow Orbs */}
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-[#3898EC]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16 lg:mb-20">
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Industries We <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3898EC] to-[#FF6B35]">Empower</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#3898EC] to-transparent mx-auto mb-8 rounded-full" />
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
              Unlocking digital potential across critical sectors with bespoke AI and engineering expertise.
            </p>
          </div>

          {/* Industries Grid */}
          <div
            ref={carouselRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6"
          >
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={industry.name}
                  className={`group relative bg-[#0a0f1a]/80 backdrop-blur-2xl border rounded-2xl p-6 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive
                    ? 'border-[#3898EC]/40 ring-1 ring-[#3898EC]/20 shadow-2xl shadow-[#3898EC]/10 -translate-y-2'
                    : 'border-white/5 hover:border-white/20 hover:-translate-y-1'
                    }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Glowing background hint for active card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#3898EC]/5 rounded-2xl blur-xl opacity-50 -z-10" />
                  )}

                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-inner ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${industry.color}30, ${industry.color}10)`
                        : 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <Icon
                      className="w-7 h-7 transition-all duration-300"
                      style={{ color: isActive ? industry.color : '#94a3b8' }}
                    />
                  </div>

                  {/* Name */}
                  <h4 className={`font-bold text-lg mb-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {industry.name}
                  </h4>

                  {/* Description */}
                  <p
                    className={`text-gray-400 text-sm leading-relaxed transition-all duration-500 ${isActive ? 'opacity-100 max-h-32 translate-y-0' : 'opacity-0 max-h-0 lg:opacity-60 lg:max-h-32 -translate-y-2'
                      } overflow-hidden`}
                  >
                    {industry.description}
                  </p>

                  {/* Premium Corner Accent */}
                  <div
                    className={`absolute top-4 right-4 transition-all duration-500 ${isActive ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
                      }`}
                  >
                    <ArrowRight className="w-5 h-5 text-[#3898EC]/70" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-12 lg:mt-16">
            {industries.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="group relative flex items-center justify-center p-2"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${index === activeIndex
                    ? 'w-10 h-1.5 bg-gradient-to-r from-[#3898EC] to-[#FF6B35]'
                    : 'w-2 h-2 bg-white/10 group-hover:bg-white/30'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
