import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, MapPin, GraduationCap } from 'lucide-react';

const AuthorSection: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-green-400' }
  ];

  const achievements = [
    'B.Tech Biosciences & Bioengineering',
    'Machine Learning Specialist',
    'Full-Stack Developer',
    'AI Research Enthusiast'
  ];

  return (
    <section id="author" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 accent-line inline-block">
            Meet the <span className="gradient-text">Creator</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Bridging the gap between biological sciences and cutting-edge technology
          </p>
        </div>
        
        <div className="glass-strong rounded-3xl p-12 fade-in hover-lift">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-gradient-to-br from-[#00d4aa] to-[#00e6b8] rounded-3xl flex items-center justify-center text-6xl font-bold text-black shadow-2xl hover-glow">
                BS
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-4xl font-bold mb-2 gradient-text-alt">Boyidi Sairam</h3>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-6">
                <div className="flex items-center gap-2 text-[#00d4aa] font-semibold">
                  <GraduationCap className="w-5 h-5" />
                  <span>B.Tech Student</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>IIT Guwahati</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
                I'm a passionate student at IIT Guwahati, specializing in Biosciences & Bioengineering. 
                I combine my deep understanding of biological systems with advanced machine learning 
                techniques to create innovative solutions that bridge the gap between life sciences and technology.
              </p>
              
              {/* Achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-14 h-14 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4aa]/30 rounded-2xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover-lift group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
                <a
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 bg-[#00d4aa]/10 hover:bg-[#00d4aa]/20 border border-[#00d4aa]/30 rounded-2xl text-[#00d4aa] hover:text-white transition-all duration-300 hover-lift font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;