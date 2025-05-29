import { useRef, useState } from 'react';
import { Menu, Activity, LineChart } from 'lucide-react';
import { DockviewApi } from 'dockview';
import { DockviewWrapper } from './components/DockviewWrapper';

const MIME = 'application/x-dockview-panel';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [connected, setConnected] = useState(false);
  const dockviewRef = useRef<{ getApi: () => DockviewApi | null }>(null);

  /* ajout par clic (ouverture d’un nouveau panneau) */
  const addPanel = (component: 'HelloWidget' | 'UPlotWidget') => {
    dockviewRef.current?.getApi()?.addPanel({
      id: `${component}-${Date.now()}`,
      component,
      title: component === 'HelloWidget' ? 'Status' : 'Scope',
    });
  };

  /* source de drag */
  const onDragStart = (comp: 'HelloWidget' | 'UPlotWidget') => (e: React.DragEvent) => {
    e.dataTransfer.setData(MIME, comp);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      {/* ---------- barre supérieure ---------- */}
      <header className="flex items-center justify-between px-6 py-3 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle sidebar">
            <Menu className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
          <img src="/heig-vd-white.svg" alt="HEIG-VD" className="h-6 mr-2" />
          <h1 className="text-base font-medium whitespace-nowrap">Motion UI</h1>
        </div>

        <button
          onClick={() => setConnected(c => !c)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium border transition
            ${
              connected
                ? 'bg-green-700 border-green-600 hover:bg-green-600'
                : 'bg-gray-700  border-gray-600  hover:bg-gray-600'
            }`}
        >
          <span className={`h-3 w-3 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
          {connected ? 'Disconnect' : 'Connect'}
        </button>
      </header>

      {/* ---------- corps ---------- */}
      <div className="flex flex-1 overflow-hidden">
        {/* ----- sidebar ----- */}
        <aside
          className={`bg-gray-800 border-r border-gray-700 transition-all
          ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            <button
              draggable
              onDragStart={onDragStart('HelloWidget')}
              onClick={() => addPanel('HelloWidget')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700"
            >
              <Activity className="w-5 h-5 text-gray-400" /> <span>Status</span>
            </button>

            <button
              draggable
              onDragStart={onDragStart('UPlotWidget')}
              onClick={() => addPanel('UPlotWidget')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700"
            >
              <LineChart className="w-5 h-5 text-gray-400" /> <span>Scope</span>
            </button>
          </nav>
        </aside>

        {/* ----- zone Dockview ----- */}
        <main className="flex-1 bg-gray-900 overflow-hidden">
          <DockviewWrapper ref={dockviewRef} />
        </main>
      </div>
    </div>
  );
}
