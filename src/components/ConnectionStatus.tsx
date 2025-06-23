import React from 'react';
import { Wifi, WifiOff, Loader } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  isConnecting: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected, isConnecting }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-black/30 border-b border-white/5">
      <div className="flex items-center gap-3">
        {isConnecting ? (
          <Loader className="w-4 h-4 text-[#00d4aa] animate-spin" />
        ) : isConnected ? (
          <Wifi className="w-4 h-4 text-[#00d4aa]" />
        ) : (
          <WifiOff className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm font-medium text-gray-300">
          {isConnecting ? 'Connecting to AI...' : isConnected ? 'AI Online' : 'Connection Failed'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`status-dot ${isConnected ? '' : 'offline'}`} />
        <span className="text-xs font-mono text-gray-500">
          {isConnected ? 'READY' : 'OFFLINE'}
        </span>
      </div>
    </div>
  );
};

export default ConnectionStatus;