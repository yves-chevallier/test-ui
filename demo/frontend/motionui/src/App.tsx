import { useState } from 'react';
import { Layout } from './components/Layout';
import { widgetList } from '@/widgets';
import { useWebSocket } from '@/ws/WebSocketProvider';

const MIME = 'application/x-dockview-panel';

export default function App() {
  const [connected, setConnected] = useState(false);

  const onDragStart = (comp: (typeof widgetList)[number]) => (e: React.DragEvent) => {
    e.dataTransfer.setData(MIME, comp);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const addPanel = (component: (typeof widgetList)[number]) => {
    // Cette logique devrait idéalement être déplacée dans le Layout si vous y gardez le ref
  };

  const ws = useWebSocket();
  ws.connect('ws://localhost:8000');
  ws.onMessage(data => console.log('Received:', data));

  return (
    <Layout
      connected={connected}
      toggleConnection={() => setConnected(c => !c)}
      onDragStart={onDragStart}
      addPanel={addPanel}
    />
  );
}
