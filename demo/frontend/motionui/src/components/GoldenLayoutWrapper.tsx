import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoldenLayout } from 'golden-layout';
import UPlotWidget from './UPlotWidget';

import 'golden-layout/dist/css/goldenlayout-base.css';
import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css';

function HelloWidget() {
  return <div className="p-4 text-white bg-blue-600">Bonjour depuis React + Golden Layout</div>;
}

const reactComponentRegistry: Record<string, React.FC> = {
  HelloWidget,
  UPlotWidget,
};

export default function GoldenLayoutWrapper({
  onReady,
}: {
  onReady?: (layout: GoldenLayout) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layoutRef = useRef<GoldenLayout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const layout = new GoldenLayout(containerRef.current);

    if (onReady) {
      onReady(layout);
    }
    layoutRef.current = layout;

    layout.registerComponentFactoryFunction('HelloWidget', (container, state) => {
      const mount = document.createElement('div');
      container.element.append(mount);

      const Component = reactComponentRegistry['HelloWidget'];
      if (Component) {
        createRoot(mount).render(<Component />);
      }
    });
    layout.registerComponentFactoryFunction('UPlotWidget', (container, state) => {
      const mount = document.createElement('div');
      container.element.append(mount);

      const Component = reactComponentRegistry['UPlotWidget'];
      if (Component) {
        createRoot(mount).render(<Component />);
      }
    });

    layout.loadLayout({
      settings: {
        showPopoutIcon: false, // Supprime "Open in new window"
        showCloseIcon: true,
        showMaximiseIcon: true,
      },
      root: {
        type: 'row',
        content: [
          {
            type: 'component',
            componentType: 'HelloWidget',
            title: 'Widget',
          },
          {
            type: 'component',
            componentType: 'UPlotWidget',
            title: 'uPlot',
          },
        ],
      },
    });

    return () => {
      layout.destroy();
    };
  }, []);

  return <div ref={containerRef} className="h-screen w-full" />;
}
