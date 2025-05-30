import {
  DockviewReact,
  DockviewApi,
  type PanelApi,
  type IDockviewPanelHeaderProps,
} from 'dockview';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useDockview } from '@/context/DockviewProvider';
import { widgetList } from '@/widgets';
import { CustomTab } from './CustomTab';
import type { WidgetMeta } from '@/widgets/WidgetBase';

const components = widgetList.reduce(
  (acc, widget) => {
    acc[widget.id] = widget.component;
    return acc;
  },
  {} as Record<string, React.FC>,
);

const tabComponents: Record<string, React.FC<IDockviewPanelHeaderProps>> = {
  custom: CustomTab,
};

const MIME = 'application/x-dockview-panel';

type Handle = {
  getApi: () => DockviewApi | null;
  addPanel: (widget: WidgetMeta) => void;
};

export function DockviewWrapper() {
  const apiRef = useRef<DockviewApi | null>(null);
  const { registerAddPanel } = useDockview();

  const addPanel = (widget: WidgetMeta) => {
    apiRef.current?.addPanel({
      id: `${widget.id}-${Date.now()}`,
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
      id: `${widget.id}-${Date.now()}`,
      component: widget.id,
      title: widget.title,
      tabComponent: 'custom',
      params: {
        widgetId: widget.id, // 👈 utile pour retrouver l'icône dans l'onglet
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
