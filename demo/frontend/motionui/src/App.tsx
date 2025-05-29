import { useState } from 'react';
import { Menu } from "lucide-react";
import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
        <div className="flex items-center">
          <button
            aria-label="Toggle sidebar"
            className="mr-4 focus:outline-none"
            onClick={() => setSidebarOpen(open => !open)}
          >
            <Menu className="h-6 w-6" />

          </button>
          <h1 className="text-xl font-semibold">Industrial Dashboard</h1>
        </div>
        {/* You can add user menu or right-side actions here */}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-gray-100 border-r transition-transform duration-300 ease-in-out overflow-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left p-2 rounded hover:bg-gray-200">
                  Widget Texte
                </button>
              </li>
              <li>
                <button className="w-full text-left p-2 rounded hover:bg-gray-200">
                  Widget uPlot
                </button>
              </li>
              {/* Add additional widget controls here */}
            </ul>
          </nav>
        </aside>

        {/* Main content (Golden Layout) */}
        <main className="flex-1 relative">
          <GoldenLayoutWrapper />
        </main>
      </div>
    </div>
  );
}
