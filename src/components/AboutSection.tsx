import React from 'react';
import { Brain, Zap, Shield, Database, Cpu, Activity } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Neural Processing',
      description: 'Advanced transformer architecture trained on comprehensive medical literature and clinical data',
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Instant symptom analysis with sophisticated pattern recognition algorithms',
      color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
    },
    {
      icon: Shield,
      title: 'Evidence-based',
      description: 'Information sourced exclusively from peer-reviewed medical research and guidelines',
      color: 'from-green-500/20 to-green-600/20 border-green-500/30'
    },
    {
      icon: Database,
      title: 'Comprehensive Database',
      description: 'Extensive drug interactions, medical terminology, and diagnostic information',
      color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
    }
  ];

  const stats = [
    { icon: Cpu, value: '7B+', label: 'Parameters' },
    { icon: Activity, value: '99.9%', label: 'Uptime' },
    { icon: Database, value: '50K+', label: 'Medical Papers' },
    { icon: Shield, value: 'HIPAA', label: 'Compliant' }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-20 fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 accent-line inline-block">
            AI <span className="gradient-text">Technology</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
            Powered by state-of-the-art machine learning models specifically trained 
            for medical applications and healthcare intelligence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass rounded-2xl p-6 text-center hover-lift card-hover fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-[#00d4aa]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#00d4aa]" />
              </div>
              <div className="text-2xl font-bold gradient-text font-mono mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass rounded-3xl p-8 hover-lift card-hover fade-in group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00d4aa] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Specs */}
        <div className="mt-20 glass rounded-3xl p-8 fade-in">
          <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Technical Specifications</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-lg font-semibold text-white mb-2">Model Architecture</div>
              <div className="text-gray-400 font-mono text-sm">Transformer-based Neural Network</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-white mb-2">Training Data</div>
              <div className="text-gray-400 font-mono text-sm">Medical Literature & Clinical Guidelines</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-white mb-2">Response Time</div>
              <div className="text-gray-400 font-mono text-sm">&lt; 2 seconds average</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;