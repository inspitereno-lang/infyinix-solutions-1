import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'About', href: '#about' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'glass-effect shadow-lg py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'
              }`}
          >
            <img
              src="/infynixbg.png"
              alt="INFYNIX"
              className="h-10 lg:h-12 object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 underline-grow"
                style={{
                  animationDelay: `${100 + index * 80}ms`,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-[#3898EC] to-[#00ffff] text-white hover:opacity-90 transition-all duration-300 magnetic-hover flex items-center gap-2 group px-6"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050B14]/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <img
            src="/infynixbg.png"
            alt="INFYNIX"
            className="h-12 object-contain mb-8"
          />
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-2xl text-white hover:text-[#3898EC] transition-colors duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection('#contact')}
            className="mt-8 bg-gradient-to-r from-[#3898EC] to-[#00ffff] text-white hover:opacity-90 transition-all duration-300 px-8"
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
