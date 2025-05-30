import { type IDockviewPanelHeaderProps } from 'dockview';
import { widgetList } from '@/widgets';
import { X, Maximize2, Minimize2, Split } from 'lucide-react';
import { cn } from '@/lib/utils'; // si vous avez une fonction utilitaire tailwind
import { Button } from '@/components/ui/button';

export const CustomTab: React.FC<IDockviewPanelHeaderProps> = ({ api, params }) => {
  const widgetId = params?.widgetId;
  const widget = widgetList.find(w => w.id === widgetId);
  const Icon = widget?.icon;

  const isMaximized = api.isMaximized();

  const handleClose = () => api.close();
  const handleToggleMaximize = () => {
    isMaximized ? api.exitMaximized() : api.maximize();
  };

  return (
    <div className="flex items-center justify-between w-full h-full px-2">
      <div className="flex items-center gap-2 overflow-hidden">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        <span className="truncate">{api.title}</span>
      </div>
      <div className="pl-3 flex items-center gap-1">
        <Button
          onClick={handleToggleMaximize}
          variant="ghost"
          size="xicon"
          className="hover:text-red-500"
          title={isMaximized ? 'Restore' : 'Maximize'}
        >
          {isMaximized ? (
            <Minimize2 className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>

        <Button
          onClick={handleClose}
          variant="ghost"
          size="xicon"
          className="hover:text-red-500"
          title="Close"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
