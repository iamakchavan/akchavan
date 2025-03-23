import { useConversation } from '@11labs/react';
import { useCallback, useState, useEffect } from 'react';
import { PhoneCall, Phone as PhoneHangup, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface VoiceButtonProps {
  onClick: () => void;
  status: string;
  error: string | null;
  isConnecting: boolean;
}

const VoiceButton = ({ onClick, status, error, isConnecting }: VoiceButtonProps) => {
  return (
    <motion.div
      onClick={onClick}
      className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-persian-green to-persian-green/60 cursor-pointer relative"
      whileHover={{ scale: 1.25 }}
      transition={{
        type: "spring",
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      animate={{
        rotate: [0, 720]
      }}
      initial={{ rotate: 0 }}
      style={{
        boxShadow: status === 'connected' ? '0 0 20px rgba(6, 182, 212, 0.5)' : 'none'
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-persian-green/20"
        initial={{ scale: 1.4, opacity: 0 }}
        animate={status === 'connected' ? {
          scale: [1.4, 1, 1.4],
          opacity: [0, 1, 0]
        } : { scale: 1.4, opacity: 0 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-white"
        style={{ rotate: 0 }}
      >
        {error ? (
          <AlertCircle className="w-4 h-4" />
        ) : isConnecting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : status === 'connected' ? (
          <PhoneHangup className="w-4 h-4 animate-pulse" />
        ) : (
          <PhoneCall className="w-4 h-4" />
        )}
      </motion.div>
    </motion.div>
  );
};

export function VoiceAgent() {
  const [apiKey] = useState<string>(import.meta.env.VITE_ELEVEN_LABS_API_KEY || '');
  const [agentId] = useState<string>(import.meta.env.VITE_ELEVEN_LABS_AGENT_ID || '');
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // TEMPORARY: Remove after testing
  useEffect(() => {
    console.log('Environment Variables Check:');
    console.log('API Key exists:', !!import.meta.env.VITE_ELEVEN_LABS_API_KEY);
    console.log('Agent ID exists:', !!import.meta.env.VITE_ELEVEN_LABS_AGENT_ID);
  }, []);

  const conversation = useConversation({
    apiKey: apiKey,
    onConnect: () => {
      console.log('Connected');
      setError(null);
      setIsConnecting(false);
    },
    onDisconnect: () => {
      console.log('Disconnected');
      setError(null);
      setIsConnecting(false);
    },
    onMessage: (message: { text: string }) => {
      console.log('Message:', message);
      setError(null);
    },
    onError: (error: { message?: string }) => {
      console.error('Error:', error);
      setError(error.message || 'Connection error occurred');
    },
    wsUrl: 'wss://api.elevenlabs.io/v1/conversation',
  });

  const startConversation = useCallback(async () => {
    if (!agentId) {
      setError('Please set your Voice Agent ID');
      return;
    }

    try {
      setError(null);
      setIsConnecting(true);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      await conversation.startSession({
        agentId: agentId,
        enableDebugLogs: true,
        connectionConfig: {
          reconnect: true,
          reconnectLimit: 3,
          reconnectInterval: 2000,
        },
        voiceSettings: {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      });
    } catch (error: any) {
      console.error('Failed to start conversation:', error);
      setError(error.message || 'Failed to start conversation');
      setIsConnecting(false);
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setError(null);
      setIsConnecting(false);
    } catch (error: any) {
      console.error('Failed to stop conversation:', error);
      setError(error.message || 'Failed to stop conversation');
      setIsConnecting(false);
    }
  }, [conversation]);

  if (!apiKey || !agentId) {
    return (
      <VoiceButton
        onClick={conversation.status === 'connected' ? stopConversation : startConversation}
        status={conversation.status}
        error={error}
        isConnecting={isConnecting}
      />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <motion.div
        onClick={conversation.status === 'connected' ? stopConversation : startConversation}
        className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-persian-green to-persian-green/60 cursor-pointer relative"
        whileHover={{ scale: 1.25 }}
        transition={{
          type: "spring",
          duration: 1.2,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        animate={{
          rotate: [0, 720]
        }}
        initial={{ rotate: 0 }}
        style={{
          boxShadow: conversation.status === 'connected' ? '0 0 20px rgba(6, 182, 212, 0.5)' : 'none'
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-persian-green/20"
          initial={{ scale: 1.4, opacity: 0 }}
          animate={conversation.status === 'connected' ? {
            scale: [1.4, 1, 1.4],
            opacity: [0, 1, 0]
          } : { scale: 1.4, opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{ rotate: 0 }}
        >
          {error ? (
            <AlertCircle className="w-4 h-4" />
          ) : isConnecting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : conversation.status === 'connected' ? (
            <PhoneHangup className="w-4 h-4 animate-pulse" />
          ) : (
            <PhoneCall className="w-4 h-4" />
          )}
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-[12.8px] text-red-500 text-center"
          >
            {error}
          </motion.p>
        ) : isConnecting ? (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-[12.8px] text-persian-green text-center"
          >
            Connecting to AK...
          </motion.p>
        ) : conversation.status === 'connected' ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[13px] font-medium tracking-tight relative cursor-pointer group"
            onClick={stopConversation}
          >
            <span className="relative">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                background: 'linear-gradient(120deg, rgba(83, 83, 83, 0.1) 0%, rgba(83, 83, 83, 0.9) 25%, rgba(83, 83, 83, 0.9) 50%, rgba(83, 83, 83, 0.1) 75%, rgba(83, 83, 83, 0.9) 100%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: '400% 100%',
                animation: 'shimmer 3s ease-in-out infinite'
              }}>
                end conversation
              </span>
              <span className="relative text-emperor group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                end conversation
              </span>
            </span>
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[13px] font-medium tracking-tight relative cursor-pointer group"
            onClick={startConversation}
          >
            <span 
              style={{
                background: 'linear-gradient(120deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.9) 100%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: '400% 100%',
                animation: 'shimmer 3s ease-in-out infinite'
            }}>
              talk to me!
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}