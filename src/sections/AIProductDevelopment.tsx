import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Brain, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AIProductDevelopment = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        featuresRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );
      const img = imageRef.current?.querySelector('img');
      if (img) {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Brain, title: 'AI Agents & Integrations', description: 'LLMs & ML powered solutions' },
    { icon: Sparkles, title: 'AI Proficiency', description: 'Advanced AI capabilities' },
    { icon: Cpu, title: 'AI R&D', description: 'Research and development' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 w-full overflow-hidden bg-[#050B14]"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `radial-gradient(#3898EC 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#3898EC]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <div className="order-2 lg:order-1">

              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-full mb-6 sm:mb-8 w-fit shrink-0 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#3898EC]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-300 tracking-wide uppercase">
                  AI Product Lab
                </span>
              </div>

              <h2
                ref={headingRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
              >
                AI-first platform{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#f9a886]">engineering.</span>
              </h2>

              <p
                ref={descRef}
                className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 font-light"
              >
                We leverage advanced LLMs, agentic workflows, and custom machine learning models to build intelligent platforms that allow your business to achieve exponential scale with less operational overhead.
              </p>

              {/* Features */}
              <div ref={featuresRef} className="space-y-4 mb-10">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-5 p-4 sm:p-5 bg-[#0a0f1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#3898EC]/30 transition-all duration-300 group shadow-lg"
                  >
                    <div className="w-12 h-12 bg-[#050B14] rounded-xl border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-[#3898EC]/20 transition-colors duration-300 shadow-inner">
                      <feature.icon className="w-6 h-6 text-gray-500 group-hover:text-[#3898EC] transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                ref={ctaRef}
                href="#services"
                className="group inline-flex items-center gap-4 text-white hover:text-[#3898EC] transition-colors duration-300"
              >
                <span className="text-lg font-semibold tracking-wide border-b border-transparent group-hover:border-[#3898EC] transition-colors pb-1">Discover our AI capabilities</span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#3898EC] transition-colors">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative">
              <div
                ref={imageRef}
                className="relative rounded-[2.5rem] overflow-hidden group aspect-square lg:aspect-[4/5] border border-white/10 shadow-2xl"
              >
                <img
                  src="/ai-section.jpg"
                  alt="AI Product Development"
                  className="absolute -top-[15%] left-0 w-full h-[130%] object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105"
                />

                {/* Decorative Overlays */}
                <div className="absolute inset-0 bg-[#3898EC]/10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-[#0a0f1a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] float-animation">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg leading-none mb-1">Agentic AI</div>
                      <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Autonomous Workflows</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Blur Orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3898EC]/20 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF6B35]/20 rounded-full blur-[60px] pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProductDevelopment;
