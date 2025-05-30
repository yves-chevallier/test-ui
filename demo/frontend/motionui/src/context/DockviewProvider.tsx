import React, { createContext, useContext, useState, useCallback } from 'react';
import type { WidgetMeta } from '@/widgets/WidgetBase';

type DockviewContextType = {
  addWidget: (widget: WidgetMeta) => void;
  registerAddPanel: (fn: (widget: WidgetMeta) => void) => void;
};

const DockviewContext = createContext<DockviewContextType | null>(null);

export const DockviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addPanelFn, setAddPanelFn] = useState<((w: WidgetMeta) => void) | null>(null);

  const addWidget = useCallback(
    (widget: WidgetMeta) => {
      if (addPanelFn) {
        addPanelFn(widget);
      } else {
        console.warn('addPanel function not registered yet');
      }
    },
    [addPanelFn],
  );

  const registerAddPanel = useCallback((fn: (w: WidgetMeta) => void) => {
    setAddPanelFn(() => fn);
  }, []);

  return (
    <DockviewContext.Provider value={{ addWidget, registerAddPanel }}>
      {children}
    </DockviewContext.Provider>
  );
};

export const useDockview = () => {
  const ctx = useContext(DockviewContext);
  if (!ctx) throw new Error('useDockview must be used within a DockviewProvider');
  return ctx;
};
