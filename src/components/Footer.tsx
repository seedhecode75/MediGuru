import React from 'react';
import { Activity, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00d4aa] to-[#00e6b8] rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-black" />
              </div>
              <div className="text-2xl font-bold">
                Medi<span className="gradient-text">Guru</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Advanced medical intelligence platform powered by cutting-edge AI technology.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold text-white mb-4">Platform</h5>
              <ul className="space-y-2">
                {['Chat Assistant', 'Technology', 'Research', 'Documentation'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#00d4aa] transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Legal</h5>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Medical Disclaimer', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#00d4aa] transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Version Info */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-[#00d4aa]">SYSTEM STATUS</span>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Version 2.1.0 - Medical AI Engine
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} MediGuru AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>for better healthcare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;