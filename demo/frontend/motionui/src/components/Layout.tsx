import { useState, useRef } from 'react';
import { HeaderBar } from './HeaderBar';
import { SideBar } from './Sidebar';
import { DockviewWrapper } from './DockviewWrapper';
import { widgetList } from '@/widgets';
import { DockviewApi } from 'dockview';

interface LayoutProps {
  connected: boolean;
  toggleConnection: () => void;
  onDragStart: (comp: (typeof widgetList)[number]) => (e: React.DragEvent) => void;
}

export function Layout({ connected, toggleConnection, onDragStart }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dockviewRef = useRef<{ getApi: () => DockviewApi | null }>(null);

  const addPanel = (component: (typeof widgetList)[number]) => {
    const api = dockviewRef.current?.getApi();
    if (!api) return;
    api.addPanel({
      id: `${component.id}-${Date.now()}`,
      component: component.id,
      title: component.title,
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-white">
      <HeaderBar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(prev => !prev)}
        connected={connected}
        toggleConnection={toggleConnection}
      />

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`
      transition-all duration-300 ease-in-out
      ${sidebarOpen ? 'w-64' : 'w-0'}
      overflow-hidden
    `}
        >
          <SideBar onDragStart={onDragStart} addPanel={addPanel} isVisible={sidebarOpen} />
        </div>

        <main className="flex-1 bg-background overflow-hidden">
          <DockviewWrapper ref={dockviewRef} />
        </main>
      </div>
    </div>
  );
}
