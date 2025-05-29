import { useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';
import { GoldenLayout } from 'golden-layout';
import { Activity, LineChart } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const layoutRef = useRef<GoldenLayout | null>(null);

  const addWidget = (type: 'HelloWidget' | 'UPlotWidget') => {
    if (!layoutRef.current) return;
    layoutRef.current.addComponent(type, { title: type });
  };
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 shadow-md">
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle sidebar"
            className="text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(open => !open)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <img
            src="/heig-vd-white.svg"
            alt="HEIG-VD Logo"
            className="h-6 max-w-[80px] object-contain mr-2"
          />
          <h1 className="text-base font-medium whitespace-nowrap">Motion UI</h1>
        </div>

        <button
          onClick={() => setConnected(c => !c)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium border transition
            ${connected ? 'bg-green-700 border-green-600 hover:bg-green-600' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
        >
          <span
            className={`h-3 w-3 rounded-full
              ${connected ? 'bg-green-400' : 'bg-red-400'}`}
          />
          {connected ? 'Disconnect' : 'Connect'}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-gray-100 border-r border-gray-700 transform transition-all duration-200 ease-in-out
    ${sidebarOpen ? 'translate-x-0 w-54' : '-translate-x-full w-0'} z-10 overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            <button
              className="w-full flex items-center gap-2 text-left px-3 py-2 rounded hover:bg-gray-700"
              onClick={() => addWidget('HelloWidget')}
            >
              <Activity className="w-5 h-5 text-gray-400" />
              <span>Status</span>
            </button>

            <button
              className="w-full flex items-center gap-2 text-left px-3 py-2 rounded hover:bg-gray-700"
              onClick={() => addWidget('UPlotWidget')}
            >
              <LineChart className="w-5 h-5 text-gray-400" />
              <span>Scope</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 relative bg-gray-900 overflow-hidden">
          <GoldenLayoutWrapper onReady={layout => (layoutRef.current = layout)} />
        </main>
      </div>
    </div>
  );
}
