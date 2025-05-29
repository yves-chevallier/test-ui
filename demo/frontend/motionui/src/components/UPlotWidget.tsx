import { useEffect, useRef, useState } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

export default function UPlotWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const plotRef = useRef<uPlot | null>(null);

  const [autoZoom, setAutoZoom] = useState(true);

  const handleResetZoom = () => {
    if (plotRef.current) {
      plotRef.current.setScale('x', null);
      plotRef.current.setScale('y', null);
    }
  };

  const handleToggleAutoZoom = () => {
    setAutoZoom(prev => !prev);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const data = [
      Array.from({ length: 100 }, (_, i) => i), // x
      Array.from({ length: 100 }, (_, i) => Math.sin(i / 10)), // y
    ];

    const options: Options = {
      width: containerRef.current.clientWidth,
      height: 300,
      scales: {
        x: { time: false },
        y: {},
      },
      axes: [
        {
          stroke: 'white', // axe X
          grid: { stroke: '#444' },
          ticks: { stroke: 'white' },
        },
        {
          stroke: 'white', // axe Y
          grid: { stroke: '#444' },
          ticks: { stroke: 'white' },
        },
      ],
      plugins: [
        {
          hooks: {
            ready: u => {
              u.over.addEventListener('wheel', e => {
                e.preventDefault();
                const factor = 0.9;
                const dir = e.deltaY < 0 ? factor : 1 / factor;

                if (e.shiftKey) {
                  // Zoom vertical
                  const mm = u.scales.y.minmax;
                  if (mm) {
                    const [min, may] = mm;
                    const mid = (min + may) / 2;
                    const range = ((may - min) * dir) / 2;
                    u.setScale('y', [mid - range, mid + range]);
                  }
                } else {
                  // Zoom horizontal
                  const mm = u.scales.x.minmax;
                  if (mm) {
                    const [min, max] = mm;
                    const mid = (min + max) / 2;
                    const range = ((max - min) * dir) / 2;
                    u.setScale('x', [mid - range, mid + range]);
                  }
                }
              });
            },
          },
        },
      ],
      series: [
        {}, // x-axis dummy
        {
          label: 'Signal',
          stroke: '#80cbc4', // couleur claire compatible mode sombre
          width: 2,
        },
      ],
    };

    plotRef.current = new uPlot(options, data, containerRef.current);

    return () => {
      plotRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="w-full h-full" />
      <div className="flex gap-2 p-2 text-white bg-gray-800">
        <button
          onClick={handleResetZoom}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
        >
          🔄 Reset
        </button>
        <button
          onClick={handleToggleAutoZoom}
          className={`px-2 py-1 rounded ${autoZoom ? 'bg-green-700' : 'bg-gray-700'}`}
        >
          ⚙️ AutoZoom {autoZoom ? 'ON' : 'OFF'}
        </button>
      </div>
    </>
  );
}
