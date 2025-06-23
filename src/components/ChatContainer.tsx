import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ConnectionStatus from './ConnectionStatus';
import { connectToGradio, sendMessage } from '../services/gradioService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI medical assistant. I can help you understand symptoms, medications, and general health information. What would you like to know?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await connectToGradio();
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect to Gradio:', error);
        setIsConnected(false);
      } finally {
        setIsConnecting(false);
      }
    };

    initializeConnection();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I\'m having trouble connecting right now. Please check your connection and try again.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="chat" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 accent-line inline-block">
            Medical <span className="gradient-text">Assistant</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ask me anything about health, symptoms, medications, or medical information
          </p>
        </div>
        
        <div className="glass-strong rounded-3xl overflow-hidden h-[700px] flex flex-col hover-lift">
          <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />
          
          <div className="flex-1 p-8 overflow-y-auto chat-messages space-y-6 hide-scrollbar">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-6 border-t border-white/5 bg-black/20">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about symptoms, medications, or health concerns..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4aa]/50 focus:bg-white/10 transition-all duration-300 pr-4"
                  disabled={isLoading || !isConnected}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !isConnected || !inputValue.trim()}
                className="bg-gradient-to-r from-[#00d4aa] to-[#00e6b8] hover:from-[#00e6b8] hover:to-[#00d4aa] disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-black rounded-2xl px-6 py-4 transition-all duration-300 flex items-center gap-2 font-semibold hover-lift min-w-[120px] justify-center"
              >
                {isLoading ? (
                  <Sparkles className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatContainer;