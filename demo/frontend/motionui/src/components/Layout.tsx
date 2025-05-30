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

      <div className="flex flex-1 relative overflow-hidden">
        <div
          className={`
            absolute top-0 left-0 bottom-0 z-10 w-64
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <SideBar onDragStart={onDragStart} addPanel={addPanel} />
        </div>

        <main className="flex-1 bg-background overflow-hidden">
          <DockviewWrapper ref={dockviewRef} />
        </main>
      </div>
    </div>
  );
}
