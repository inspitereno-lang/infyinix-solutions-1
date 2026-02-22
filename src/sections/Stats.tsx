import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyLoad } from '@/hooks/useLazyLoad';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 12, suffix: '', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].val));
            },
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { ref: sectionRef, isVisible } = useLazyLoad<HTMLElement>({ threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(false);

  // Optimized particle animation
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    // Reduced particle count for performance
    const particleCount = isMobile ? 15 : 25;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    // Use IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    let frameCount = 0;
    const animate = () => {
      // Skip frames for performance (30fps instead of 60fps)
      frameCount++;
      if (frameCount % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(31, 111, 229, 0.4)';
        ctx.fill();

        // Connect nearby particles - limit connections for performance
        if (i % 3 === 0) {
          for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
            const other = particles[j];
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(31, 111, 229, ${0.08 * (1 - distance / 80)})`;
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 w-full overflow-hidden bg-black"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] lg:w-[600px] lg:h-[300px] bg-[#1F6FE5]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#F97316] text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Our Impact
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-3 sm:mt-4">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative py-6 sm:py-8 lg:py-12 text-center">
                {/* Outline Number */}
                <div 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight transition-all duration-300 group-hover:opacity-0"
                  style={{
                    WebkitTextStroke: '2px rgba(249, 115, 22, 0.4)',
                    color: 'transparent',
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Filled Number (on hover) */}
                <div className="absolute inset-0 flex items-center justify-center py-6 sm:py-8 lg:py-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F97316]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                </div>

                {/* Label */}
                <p className="text-gray-400 mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base">
                  {stat.label}
                </p>
              </div>

              {/* Bottom Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1F6FE5] to-[#F97316] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
