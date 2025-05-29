import { useRef, useState } from 'react';
import { DockviewApi } from 'dockview';
import { DockviewWrapper } from './components/DockviewWrapper';
import { HeaderBar } from './components/HeaderBar';
import { SideBar } from './components/Sidebar';
import { widgetList } from '@/widgets';
import { useWebSocket } from '@/ws/WebSocketProvider';
const MIME = 'application/x-dockview-panel';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [connected, setConnected] = useState(false);
  const dockviewRef = useRef<{ getApi: () => DockviewApi | null }>(null);

  const addPanel = (component: (typeof widgetList)[number]) => {
    dockviewRef.current?.getApi()?.addPanel({
      id: `${component.id}-${Date.now()}`,
      component,
      title: component.title,
    });
  };

  const onDragStart = (comp: (typeof widgetList)[number]) => (e: React.DragEvent) => {
    e.dataTransfer.setData(MIME, comp);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const ws = useWebSocket();
  ws.connect('ws://localhost:8000');
  ws.onMessage(data => {
    console.log('Received:', data);
  });
  return (
    <div className="flex flex-col h-screen w-screen bg-background text-white">
      <HeaderBar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
        connected={connected}
        toggleConnection={() => setConnected(c => !c)}
      />

      <div className="flex flex-1 overflow-hidden">
        <SideBar sidebarOpen={sidebarOpen} onDragStart={onDragStart} addPanel={addPanel} />

        <main className="flex-1 bg-gray-900 overflow-hidden">
          <DockviewWrapper ref={dockviewRef} />
        </main>
      </div>
    </div>
  );
}
