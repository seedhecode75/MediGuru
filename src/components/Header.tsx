import React, { useState, useEffect } from 'react';
import { Activity, MessageSquare, Cpu, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass-strong' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center gap-3 slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00d4aa] to-[#00e6b8] rounded-xl flex items-center justify-center hover-glow">
              <Activity className="w-5 h-5 text-black font-bold" />
            </div>
            <div className="text-2xl font-bold tracking-tight">
              Medi<span className="gradient-text">Guru</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 slide-in-right">
            {[
              { label: 'Chat', id: 'chat', icon: MessageSquare },
              { label: 'Technology', id: 'about', icon: Cpu },
              { label: 'Creator', id: 'author', icon: User }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 text-gray-400 hover:text-[#00d4aa] transition-all duration-300 text-sm font-medium group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00d4aa] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-[#00d4aa] transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-strong border-t border-white/10 fade-in-fast">
            <div className="px-6 py-4 space-y-4">
              {[
                { label: 'Chat', id: 'chat', icon: MessageSquare },
                { label: 'Technology', id: 'about', icon: Cpu },
                { label: 'Creator', id: 'author', icon: User }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 text-gray-400 hover:text-[#00d4aa] transition-colors duration-300 text-base font-medium w-full text-left py-2"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;