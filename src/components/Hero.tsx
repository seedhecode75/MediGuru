import React from 'react';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToChat = () => {
    const element = document.getElementById('chat');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4aa]/5 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00e6b8]/3 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center max-w-5xl mx-auto relative z-10">
        <div className="fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4aa]/20 mb-8 hover-lift">
            <Sparkles className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-sm font-mono text-gray-300">AI-Powered Medical Intelligence</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
            <span className="gradient-text-alt">Medical</span>
            <br />
            <span className="gradient-text font-black">Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            Advanced AI-powered medical assistance providing accurate health information 
            and intelligent guidance for your healthcare needs
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={scrollToChat}
              className="group inline-flex items-center gap-3 btn-primary hover-lift text-lg px-8 py-4"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Start Consultation</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => scrollToSection('about')}
              className="btn-secondary hover-lift text-lg px-8 py-4"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            {[
              { number: '0.1310', label: 'ROUGE-L Score' },
              { number: '15.69', label: 'Perplexity' },
              { number: '~4.14 GB', label: 'Model Size' }
            ].map((stat, index) => (
              <div key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-2xl md:text-3xl font-bold gradient-text font-mono">{stat.number}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default Hero;
