// src/widgets/WidgetBase.ts

import type { LucideIcon } from 'lucide-react';

export interface WidgetMeta {
    id: string;
    title: string;
    icon?: LucideIcon;
    component: React.FC;
    uuid?: string; // facultatif pour traçabilité
}

export function defineWidget(meta: Omit<WidgetMeta, 'uuid'>): WidgetMeta {
    return {
        ...meta,
        uuid: crypto.randomUUID(), // ou une autre stratégie si vous préférez
    };
}
