import type { LucideIcon } from 'lucide-react';

export interface WidgetLifecycleAPI {
  onMount?: () => void;
  onUnmount?: () => void;
}

export interface WidgetComponentProps {
  api: WidgetLifecycleAPI;
}

export type WidgetComponent = React.FC<WidgetComponentProps>;

export interface WidgetMeta {
  id: string;
  title: string;
  icon?: LucideIcon;
  component: WidgetComponent;
  uuid?: string;
}

export function defineWidget(meta: Omit<WidgetMeta, 'uuid'>): WidgetMeta {
  return {
    ...meta,
    uuid: crypto.randomUUID(),
  };
}
