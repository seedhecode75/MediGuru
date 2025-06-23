import React from 'react';
import { AlertTriangle, Shield, Info } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="glass rounded-3xl p-8 border-l-4 border-yellow-400/50 fade-in">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Medical Disclaimer
            </h4>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg font-medium">
                This AI provides health information for educational purposes only.
              </p>
              <p>
                MediGuru AI is not a substitute for professional medical advice, diagnosis, or treatment. 
                Always consult qualified healthcare providers for medical concerns, emergencies, or before 
                making any healthcare decisions.
              </p>
              <div className="flex items-start gap-3 mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-blue-400">Important:</strong> In case of medical emergencies, 
                  contact your local emergency services immediately. Do not rely on AI for urgent medical situations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;