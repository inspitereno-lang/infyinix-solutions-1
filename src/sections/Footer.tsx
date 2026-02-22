import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    'Services': [
      { label: 'AI & Automation', href: '#' },
      { label: 'Cloud Solutions', href: '#' },
      { label: 'Web & Mobile Apps', href: '#' },
      { label: 'Data Engineering', href: '#' },
      { label: 'UI/UX Design', href: '#' },
    ],
    'Industries': [
      { label: 'HealthTech', href: '#' },
      { label: 'FinTech', href: '#' },
      { label: 'E-Commerce', href: '#' },
      { label: 'EdTech', href: '#' },
      { label: 'SaaS', href: '#' },
    ],
    'Company': [
      { label: 'About Us', href: '#about' },
      { label: 'Our Team', href: '#' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050B14] overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(#3898EC 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3898EC]/5 rounded-full blur-[120px]" />
      </div>

      {/* Top Transition Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3898EC]/30 to-transparent" />

      <div ref={contentRef} className="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
            {/* Logo & Description */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <a href="#" className="inline-block mb-3 sm:mb-4">
                <img
                  src="/infynixbg.png"
                  alt="INFYNIX"
                  className="h-10 sm:h-12 object-contain"
                />
              </a>
              <p className="text-gray-400 text-sm mb-4 sm:mb-6 max-w-xs">
                A next-generation digital transformation company dedicated to
                reimagining how businesses connect with their customers.
              </p>

              {/* Social Links */}
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3898EC] hover:border-[#3898EC] hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">{title}</h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white hover:translate-x-0.5 inline-block transition-all duration-300 text-xs sm:text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="border-t border-white/10 pt-6 sm:pt-8 mb-6 sm:mb-8">
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-500">HQ:</span>{' '}
                <span className="text-gray-300">Infopark Campus, Kochi, India</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>{' '}
                <a href="mailto:info@infynix.com" className="text-gray-300 hover:text-[#3898EC] transition-colors">
                  info@infynix.com
                </a>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>{' '}
                <a href="tel:+918714153735" className="text-gray-300 hover:text-[#3898EC] transition-colors">
                  +91 87141 53735
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              Copyright © 2026 Infynix Solutions. All Rights Reserved
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
