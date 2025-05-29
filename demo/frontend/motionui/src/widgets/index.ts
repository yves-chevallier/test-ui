// src/widgets/index.ts
const modules = import.meta.glob('./*.tsx', { eager: true });

export const widgetList = Object.values(modules)
    .map((mod: any) => mod.widgetMeta)
    .filter(Boolean);
