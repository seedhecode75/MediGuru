import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex gap-4 fade-in-fast ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30' 
          : 'bg-gradient-to-br from-[#00d4aa]/20 to-[#00e6b8]/20 border border-[#00d4aa]/30'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-blue-400" />
        ) : (
          <Bot className="w-5 h-5 text-[#00d4aa]" />
        )}
      </div>
      
      <div className={`max-w-2xl ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-6 py-4 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 text-blue-100' 
            : 'bg-white/5 border border-white/10 text-gray-100 hover:bg-white/10 transition-colors duration-300'
        }`}>
          <div 
            className="text-sm leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ 
              __html: message
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00d4aa] font-semibold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
            }}
          />
        </div>
        {timestamp && (
          <div className={`text-xs text-gray-500 mt-2 font-mono ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;