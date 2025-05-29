import { createContext, useContext, useRef, type ReactNode } from 'react';
import { WebSocketClient } from './WebSocketClient';

// Création du contexte avec type explicite
const WebSocketContext = createContext<WebSocketClient | null>(null);

// Provider avec typage clair sur les props enfants
export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const clientRef = useRef(new WebSocketClient());

  return (
    <WebSocketContext.Provider value={clientRef.current}>{children}</WebSocketContext.Provider>
  );
};

// Hook personnalisé pour accéder au client WebSocket
export const useWebSocket = (): WebSocketClient => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
