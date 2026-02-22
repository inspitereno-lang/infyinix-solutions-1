import { useEffect, useRef, useState } from 'react';
import { MapPin, Target, Eye, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyLoad } from '@/hooks/useLazyLoad';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '150+', label: 'Projects Delivered', icon: Award },
  { value: '50+', label: 'Expert Engineers', icon: Target },
  { value: '12', label: 'Years Experience', icon: Eye },
];

export default function About() {
  const { ref: sectionRef, isVisible } = useLazyLoad<HTMLElement>({ threshold: 0.1 });
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      // Image reveal animation
      if (imageRef.current && imageLoaded) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
          {
            clipPath: 'circle(100% at 50% 50%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Content animation
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

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-card'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef as React.RefObject<HTMLElement>);

    return () => ctx.revert();
  }, [isVisible, imageLoaded]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 w-full overflow-hidden"
    >
      {/* Background Elements - Simplified */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-[#1F6FE5]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Column */}
          <div
            ref={imageRef}
            className="relative rounded-2xl lg:rounded-3xl overflow-hidden opacity-0"
            style={{ clipPath: 'circle(0% at 50% 50%)' }}
          >
            <img
              src="/about-team.jpg"
              alt="Our Team"
              className="w-full h-[280px] sm:h-[350px] lg:h-[450px] object-cover"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
            
            {/* Location Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 glass rounded-xl px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1F6FE5]/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#1F6FE5]" />
              </div>
              <div>
                <p className="text-white font-medium text-sm sm:text-base">Infopark, Kochi</p>
                <p className="text-gray-400 text-xs sm:text-sm">Kerala, India</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef}>
            <div className="animate-item opacity-0">
              <span className="text-[#1F6FE5] text-xs sm:text-sm font-semibold tracking-wider uppercase">
                About Us
              </span>
            </div>

            <h2 className="animate-item text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight opacity-0">
              Architects of the{' '}
              <span className="text-gradient">Digital Age</span>
            </h2>

            <p className="animate-item text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 opacity-0">
              Based in the heart of Infopark, we are a collective of engineers, designers, 
              and strategists dedicated to building the infrastructure of tomorrow. Our 
              passion lies in transforming complex challenges into elegant, scalable solutions.
            </p>

            <p className="animate-item text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 opacity-0">
              Since 2012, we have partnered with startups and Fortune 500 companies alike, 
              delivering cutting-edge solutions in web development, AI, cloud infrastructure, 
              and digital transformation.
            </p>

            {/* Mission & Vision */}
            <div className="animate-item grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 opacity-0">
              <div className="glass rounded-xl p-4 sm:p-5 hover:border-[#1F6FE5]/50 transition-colors">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#F97316] mb-2 sm:mb-3" />
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Our Mission</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Empower businesses through innovative technology solutions that drive growth.
                </p>
              </div>
              <div className="glass rounded-xl p-4 sm:p-5 hover:border-[#1F6FE5]/50 transition-colors">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F6FE5] mb-2 sm:mb-3" />
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Our Vision</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  To be the global leader in digital transformation and technology innovation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 sm:mt-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center group hover:bg-white/10 transition-all duration-300 opacity-0"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1F6FE5]/20 to-[#1F6FE5]/5 flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#1F6FE5]" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#F97316] mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
