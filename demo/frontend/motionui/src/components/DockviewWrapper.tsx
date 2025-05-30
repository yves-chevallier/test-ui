import { DockviewReact, DockviewApi, type IDockviewPanelHeaderProps } from 'dockview';
import { useEffect, useRef } from 'react';
import { useDockview } from '@/context/DockviewProvider';
import { widgetList } from '@/widgets';
import { CustomTab } from './CustomTab';
import type { WidgetMeta, WidgetComponent } from '@/widgets/WidgetBase';

function wrapWithLifecycle(Component: WidgetComponent): React.FC {
  return () => {
    const lifecycleApi = useRef<{
      onMount?: () => void;
      onUnmount?: () => void;
    }>({});

    useEffect(() => {
      const id = requestAnimationFrame(() => {
        lifecycleApi.current.onMount?.();
      });
      return () => {
        cancelAnimationFrame(id);
        lifecycleApi.current.onUnmount?.();
      };
    }, []);
    return <Component api={lifecycleApi.current} />;
  };
}

const components = widgetList.reduce(
  (acc, widget) => {
    acc[widget.id] = wrapWithLifecycle(widget.component);
    return acc;
  },
  {} as Record<string, React.FC>,
);

const tabComponents: Record<string, React.FC<IDockviewPanelHeaderProps>> = {
  custom: CustomTab,
};

const MIME = 'application/x-dockview-panel';

export function DockviewWrapper() {
  const apiRef = useRef<DockviewApi | null>(null);
  const { registerAddPanel } = useDockview();

  const addPanel = (widget: WidgetMeta) => {
    apiRef.current?.addPanel({
      id: widget.uuid!,
      component: widget.id,
      title: widget.title,
      tabComponent: 'custom',
      params: { widgetId: widget.id },
    });
  };

  const onReady = ({ api }: { api: DockviewApi }) => {
    apiRef.current = api;
    registerAddPanel(addPanel);
  };

  const onDrop = (e: any) => {
    const id = e.nativeEvent.dataTransfer?.getData(MIME);
    const widget = widgetList.find(w => w.id === id);
    if (!widget) return;

    e.api.addPanel({
      id: widget.uuid!,
      component: widget.id,
      title: widget.title,
      tabComponent: 'custom',
      params: {
        widgetId: widget.id,
      },
    });
  };

  return (
    <DockviewReact
      className="w-full h-full dockview-theme-tailwind"
      components={components}
      tabComponents={tabComponents}
      onReady={onReady}
      onDidDrop={onDrop}
    />
  );
}
