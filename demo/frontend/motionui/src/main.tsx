import './index.css';
import './theme.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { WebSocketProvider } from './ws/WebSocketProvider';
import { ThemeProvider } from './theme/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebSocketProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </WebSocketProvider>
  </StrictMode>,
);
