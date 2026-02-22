import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        infoRef.current?.children || [],
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          delay: 0.3,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Infopark Campus,\nKochi, Kerala 682042, India',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@infynix.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 87141 53735',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 w-full overflow-hidden bg-[#050B14]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `radial-gradient(#3898EC 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-[#3898EC]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16 lg:mb-20">
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            >
              Let's Build Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3898EC] to-[#FF6B35]">Future Together</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#3898EC] to-transparent mx-auto mb-8 rounded-full" />
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
              Have a visionary project? Our engineering hub is ready to bring it to life with precision and scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Contact Info Column */}
            <div ref={infoRef} className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="group flex items-start gap-6 p-6 bg-[#0a0f1a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl hover:border-[#3898EC]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#3898EC]/5"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3898EC]/20 to-[#FF6B35]/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-inner">
                    <info.icon className="w-7 h-7 text-[#3898EC]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2">{info.title}</h4>
                    <p className="text-gray-400 text-base whitespace-pre-line leading-relaxed">{info.content}</p>
                  </div>
                </div>
              ))}

              {/* Global Presence Special Card */}
              <div className="p-8 bg-gradient-to-br from-[#0a0f1a]/80 to-[#161b22]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3898EC]/5 rounded-full blur-3xl" />
                <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#3898EC] animate-pulse" />
                  Global Presence
                </h4>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[#3898EC] font-bold block mb-2 uppercase tracking-widest text-xs">United States</span>
                    <p className="text-gray-400 text-sm">Portland, OR 97229</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[#3898EC] font-bold block mb-2 uppercase tracking-widest text-xs">Singapore</span>
                    <p className="text-gray-400 text-sm">CT Hub 2, Singapore 338729</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-[#0a0f1a]/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#3898EC]/5 rounded-full blur-[100px] pointer-events-none" />

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-2xl shadow-green-500/10">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Transmission Received</h3>
                  <p className="text-gray-400 text-lg max-w-sm">
                    Our team will analyze your requirements and reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                    <Send className="w-6 h-6 text-[#3898EC]" />
                    Send us a Message
                  </h3>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium ml-1">Name *</label>
                        <Input
                          type="text"
                          placeholder="Ex: John Smith"
                          required
                          className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-[#3898EC]/50 focus:ring-4 focus:ring-[#3898EC]/10 rounded-2xl transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium ml-1">Email *</label>
                        <Input
                          type="email"
                          placeholder="john@vanguard.com"
                          required
                          className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-[#3898EC]/50 focus:ring-4 focus:ring-[#3898EC]/10 rounded-2xl transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-300 text-sm font-medium ml-1">Company</label>
                        <Input
                          type="text"
                          placeholder="Your Organization"
                          className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-[#3898EC]/50 focus:ring-4 focus:ring-[#3898EC]/10 rounded-2xl transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-300 text-sm font-medium ml-1">Service *</label>
                        <Select required>
                          <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white focus:bg-white/10 focus:ring-4 focus:ring-[#3898EC]/10 rounded-2xl transition-all duration-300">
                            <SelectValue placeholder="Select interest area" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0a0f1a] border-white/10 text-white rounded-2xl overflow-hidden backdrop-blur-3xl">
                            <SelectItem value="ai" className="hover:bg-white/5 transition-colors">AI Product Development</SelectItem>
                            <SelectItem value="e2e" className="hover:bg-white/5 transition-colors">End-to-End Development</SelectItem>
                            <SelectItem value="ux" className="hover:bg-white/5 transition-colors">UX Studio</SelectItem>
                            <SelectItem value="devops" className="hover:bg-white/5 transition-colors">DevOps</SelectItem>
                            <SelectItem value="qa" className="hover:bg-white/5 transition-colors">Quality Assurance</SelectItem>
                            <SelectItem value="web3" className="hover:bg-white/5 transition-colors">Web 3.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-300 text-sm font-medium ml-1">Message *</label>
                      <Textarea
                        placeholder="Briefly describe your vision..."
                        required
                        className="min-h-[160px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-[#3898EC]/50 focus:ring-4 focus:ring-[#3898EC]/10 rounded-2xl transition-all duration-300 resize-none p-6"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full h-16 bg-gradient-to-r from-[#3898EC] to-[#7dbdf3] text-white hover:shadow-2xl hover:shadow-[#3898EC]/30 transition-all duration-500 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 active:scale-95 disabled:grayscale"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          Initialize Partnership
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
