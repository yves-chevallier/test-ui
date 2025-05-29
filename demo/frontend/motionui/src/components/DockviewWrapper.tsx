import { DockviewReact, DockviewApi } from 'dockview';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import HelloWidget from './HelloWidget';
import UPlotWidget from './UPlotWidget';

const components = {
  HelloWidget: () => <HelloWidget />,
  UPlotWidget: () => <UPlotWidget />,
};

const MIME = 'application/x-dockview-panel';

type Handle = { getApi: () => DockviewApi | null };

export const DockviewWrapper = forwardRef<Handle>((_, ref) => {
  const apiRef = useRef<DockviewApi | null>(null);

  /* --- exposer l’API au parent --- */
  useImperativeHandle(ref, () => ({ getApi: () => apiRef.current }));

  /* --- Dockview prêt : on crée le layout par code --- */
  const onReady = ({ api }: { api: DockviewApi }) => {
    apiRef.current = api;

    // 1. Status dans un nouveau groupe
    api.addPanel({
      id: 'status',
      component: 'HelloWidget',
      title: 'Status',
    });

    // 2. Scope dans un second groupe scindé à droite
    const rightGroup = api.addGroup({ direction: 'right' });
    api.addPanel({
      id: 'scope',
      component: 'UPlotWidget',
      title: 'Scope',
      position: { referenceGroup: rightGroup },
    });
  };

  /* --- gestion du drag & drop externe --- */
  const allowDrop = (e: any) => {
    if (e.nativeEvent.dataTransfer?.types.includes(MIME)) {
      e.accept();
    }
  };

  const onDrop = (e: any) => {
    const comp = e.nativeEvent.dataTransfer?.getData(MIME);
    if (!comp) return;
    e.api.addPanel({
      id: `${comp}-${Date.now()}`,
      component: comp,
      title: comp === 'HelloWidget' ? 'Status' : 'Scope',
    });
  };

  return (
    <DockviewReact
      className="w-full h-full"
      components={components}
      onReady={onReady}
      showDndOverlay={allowDrop}
      onDidDrop={onDrop}
    />
  );
});
