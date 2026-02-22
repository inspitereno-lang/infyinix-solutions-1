import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';
import { Briefcase, ThumbsUp, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  icon: LucideIcon;
}

const StatItem = ({ value, suffix, label, delay, icon: Icon }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'expo.out',
          delay: delay,
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              if (!hasAnimated.current) {
                hasAnimated.current = true;
                gsap.to(
                  { val: 0 },
                  {
                    val: value,
                    duration: 2,
                    delay: delay + 0.3,
                    ease: 'expo.out',
                    onUpdate: function () {
                      setCount(Math.floor(this.targets()[0].val));
                    },
                  }
                );
              }
            },
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [value, delay]);

  return (
    <div
      ref={itemRef}
      className="group relative bg-[#0a0f1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 text-center transition-all duration-500 hover:border-[#3898EC]/30 hover:-translate-y-1 overflow-hidden"
    >
      {/* Subtle inner highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="w-12 h-12 mx-auto mb-4 bg-[#050B14] shadow-inner border border-white/5 rounded-xl flex items-center justify-center group-hover:border-[#3898EC]/20 transition-colors duration-500 relative">
        <div className="absolute inset-0 bg-[#3898EC]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        <Icon className="w-6 h-6 text-gray-500 group-hover:text-[#3898EC] transition-colors duration-500 relative z-10" />
      </div>

      {/* Number */}
      <div
        className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight flex items-baseline justify-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300 relative z-10"
      >
        {count}
        <span className="text-[#3898EC] text-2xl lg:text-3xl ml-1 font-bold">{suffix}</span>
      </div>

      {/* Label */}
      <div className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest relative z-10">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 500, suffix: '+', label: 'Projects Delivered', icon: Briefcase },
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: ThumbsUp },
    { value: 15, suffix: '+', label: 'Years Experience', icon: Clock },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-20 lg:py-32 w-full overflow-hidden bg-[#050B14]"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Continuous Grid Mesh - matches Hero, Services, etc. */}
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `radial-gradient(#3898EC 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

        {/* Artistic Glow Orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#3898EC]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B35]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16 lg:mb-20">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              Our Impact in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3898EC] to-[#60A5FA]">Numbers</span>.
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Delivering measurable excellence across industries with a proven track record of engineering success.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
