import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-4 fade-in-fast">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00d4aa]/20 to-[#00e6b8]/20 border border-[#00d4aa]/30 flex items-center justify-center flex-shrink-0">
        <Bot className="w-5 h-5 text-[#00d4aa]" />
      </div>
      <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl hover:bg-white/10 transition-colors duration-300">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;