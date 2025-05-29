import { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { LogoHEIG } from './LogoHEIG';

interface HeaderBarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  connected: boolean;
  toggleConnection: () => void;
}

export function HeaderBar({
  sidebarOpen,
  toggleSidebar,
  connected,
  toggleConnection,
}: HeaderBarProps) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    // inutile de faire `setIsDark` ici, l'observer s'en charge
  };

  return (
    <header className="flex items-center px-6 py-3 bg-background shadow-md">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="w-6 h-6 text-muted-foreground hover:text-foreground" />
        </button>
        <LogoHEIG className="h-8 mr-2" />
        <h1 className="text-base font-medium whitespace-nowrap text-foreground">Motion UI</h1>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={toggleConnection}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium border transition
    ${
      connected
        ? 'bg-green-700 border-green-600 hover:bg-green-600 text-foreground'
        : 'bg-muted border-border hover:bg-muted/80 text-foreground'
    }`}
        >
          <span className={`h-3 w-3 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
          {connected ? 'Disconnect' : 'Connect'}
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-md p-2 hover:bg-muted transition"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>
    </header>
  );
}
