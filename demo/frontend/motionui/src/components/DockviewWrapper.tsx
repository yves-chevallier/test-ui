import { DockviewReact, DockviewApi } from 'dockview';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { widgetList } from '@/widgets';

const components = widgetList.reduce(
  (acc, widget) => {
    acc[widget.id] = widget.component;
    return acc;
  },
  {} as Record<string, React.FC>,
);

const MIME = 'application/x-dockview-panel';

type Handle = { getApi: () => DockviewApi | null };

export const DockviewWrapper = forwardRef<Handle>((_, ref) => {
  const apiRef = useRef<DockviewApi | null>(null);

  useImperativeHandle(ref, () => ({ getApi: () => apiRef.current }));

  const onReady = ({ api }: { api: DockviewApi }) => {
    apiRef.current = api;
  };

  const allowDrop = (e: any) => {
    if (e.nativeEvent.dataTransfer?.types.includes(MIME)) {
      e.accept();
    }
  };

  const onDrop = (e: any) => {
    const id = e.nativeEvent.dataTransfer?.getData(MIME);
    const widget = widgetList.find(w => w.id === id);
    if (!widget) return;

    e.api.addPanel({
      id: `${widget.id}-${Date.now()}`,
      component: widget.id,
      title: widget.title,
    });
  };

  return (
    <DockviewReact
      className="w-full h-full dockview-theme-tailwind"
      components={components}
      onReady={onReady}
      showDndOverlay={allowDrop}
      onDidDrop={onDrop}
      disableAutoTheme
    />
  );
});
