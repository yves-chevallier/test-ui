import { widgetList } from '@/widgets';
import { CheckCircle, XCircle } from 'lucide-react';
import { useDockview } from '@/context/DockviewProvider';

interface SideBarProps {
  onDragStart: (comp: string) => (e: React.DragEvent) => void;
}

export function SideBar({ onDragStart }: SideBarProps) {
  const isOperational = true;
  const fault = true;
  const { addWidget } = useDockview();
  return (
    <aside className="h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {/* Contenu scrollable */}
      <nav className="p-4 space-y-2 flex-1 overflow-auto">
        {widgetList.map(widget => {
          const Icon = widget.icon;
          return (
            <button
              key={widget.id}
              draggable
              onDragStart={onDragStart(widget)}
              onClick={() => addWidget(widget)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition"
            >
              {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
              <span className="text-foreground">{widget.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Statuts collés en bas */}
      <div className="border-t border-sidebar-border p-3">
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
