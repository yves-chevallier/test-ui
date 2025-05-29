import { widgetList } from '@/widgets';
import { CheckCircle, XCircle } from 'lucide-react';

interface SideBarProps {
  sidebarOpen: boolean;
  onDragStart: (comp: string) => (e: React.DragEvent) => void;
  addPanel: (component: string) => void;
}

export function SideBar({ sidebarOpen, onDragStart, addPanel }: SideBarProps) {
  const isOperational = true; // exemple de bit pour l'état opérationnel
  const fault = true; // exemple de bit pour l'état de défaut

  return (
    <aside
      className={`bg-background border-r border-border transition-all flex flex-col
        ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}
    >
      <nav className="p-4 space-y-2 flex-1 overflow-auto">
        {widgetList.map(widget => {
          const Icon = widget.icon;
          return (
            <button
              key={widget.id}
              draggable
              onDragStart={onDragStart(widget.id)}
              onClick={() => addPanel(widget.id)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition"
            >
              {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
              <span className="text-foreground">{widget.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Statuts CANopen fixés en bas */}
      <div className="border-t border-border p-3">
        <ul className="divide-y divide-border">
          <li className="flex items-center gap-2 text-sm text-foreground py-1">
            {isOperational ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span>{isOperational ? 'OPERATIONAL' : 'NOT READY'}</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-foreground py-1">
            {!fault ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span>{fault ? 'Drive in error' : 'No Error'}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
