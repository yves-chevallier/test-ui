import { useEffect, useRef, useState, useContext } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { cssVarToHex } from '@/lib';
import { Play, Pause, ZoomIn, ArrowDownUp, MoveDiagonal, ScanSearch } from 'lucide-react';
import { type LucideIcon, LineChart } from 'lucide-react';
import { type FC } from 'react';
import { ThemeContext } from '@/theme/ThemeProvider';

const xyMinMax = (arr: number[]) => [Math.min(...arr), Math.max(...arr)] as [number, number];

export function UPlotWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const plotRef = useRef<uPlot | null>(null);

  const [autoZoom, setAutoZoom] = useState(true);
  const [isRunning, setIsRunning] = useState(true);
  const [data, setData] = useState<[number[], number[]]>([[], []]);

  const MAX_POINTS = 1_000;

  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    let start = performance.now();
    let rafId: number;

    const loop = () => {
      if (!isRunning) return;

      const t = (performance.now() - start) / 1000; // secondes
      const y = Math.sin(2 * Math.PI * t); // 1 Hz

      setData(([xs, ys]) => [[...xs, t].slice(-MAX_POINTS), [...ys, y].slice(-MAX_POINTS)]);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isRunning]);

  useEffect(() => {
    if (!containerRef.current) return;

    const [x, y] = data;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (!plotRef.current) {
      const axisColor = cssVarToHex('--foreground');
      const gridColor = cssVarToHex('--border');

      console.log('width', width, 'height', height, 'data length', x.length);

      const opts = {
        width,
        height: 800,
        scales: { x: { time: false }, y: {} },
        axes: [
          {
            stroke: axisColor,
            grid: { stroke: gridColor },
            ticks: { stroke: axisColor },
          },
          {
            stroke: axisColor,
            grid: { stroke: gridColor },
            ticks: { stroke: axisColor },
          },
        ],
        series: [{}, { label: 'Signal', stroke: cssVarToHex('--chart-1'), width: 2 }],
        plugins: [
          {
            hooks: {
              ready: (u: uPlot) => {
                u.over.addEventListener('wheel', (e: WheelEvent) => {
                  e.preventDefault();
                  const factor = 0.9;
                  const zoomDir = e.deltaY < 0 ? factor : 1 / factor;
                  const key = e.shiftKey ? 'y' : 'x';
                  const mm = u.scales[key].minmax;
                  if (!mm) return;
                  const [min, max] = mm;
                  const mid = (min + max) / 2;
                  const range = ((max - min) * zoomDir) / 2;
                  u.setScale(key, [mid - range, mid + range]);
                });
              },
            },
          },
        ],
      };

      plotRef.current = new uPlot(opts, [x, y], containerRef.current);
    } else {
      // Update data
      const u = plotRef.current;
      u.setSize({ width, height: 300 });
      u.setData([x, y]);

      if (autoZoom && x.length) {
        const [xMin, xMax] = xyMinMax(x);
        const [yMin, yMax] = xyMinMax(y);
        u.setScale('x', [xMin, xMax]);
        u.setScale('y', [yMin, yMax]);
      }
    }
  }, [data, autoZoom]);

  useEffect(() => {
    // Theme has changed, uPlot is not reactive to theme changes,
    // So we invalidate, delete current:
    if (plotRef.current) {
      plotRef.current.destroy();
      plotRef.current = null;
    }
  }, [themeContext]);

  const resetZoomX = () => {
    const [x] = data;
    if (x.length) plotRef.current?.setScale('x', xyMinMax(x));
  };

  const resetZoomY = () => {
    const [, y] = data;
    if (y.length) plotRef.current?.setScale('y', xyMinMax(y));
  };

  const stepZoom = () => {
    if (isRunning || !plotRef.current) return;
    const mm = plotRef.current.scales.x.minmax;
    if (!mm) return;
    const [min, max] = mm;
    const range = max - min;
    plotRef.current.setScale('x', [min + range * 0.1, max - range * 0.1]);
  };

  const Btn = ({
    onClick,
    title,
    children,
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600"
    >
      {children}
    </button>
  );
  return (
    <div className="flex h-full ">
      <div ref={containerRef} className="flex-1 h-full w-full" />

      <div className="flex flex-col gap-2 p-2 bg-background text-white">
        <button
          onClick={() => setIsRunning(r => !r)}
          title="Play / Pause"
          className="p-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          onClick={resetZoomY}
          title="Reset Zoom Y"
          className="p-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          <ArrowDownUp size={16} />
        </button>

        <button
          onClick={resetZoomX}
          title="Reset Zoom X"
          className="p-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          <MoveDiagonal size={16} />
        </button>

        <button
          onClick={() => setAutoZoom(z => !z)}
          title="AutoZoom"
          className="p-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          <ScanSearch size={16} className={autoZoom ? 'text-green-400' : 'text-gray-400'} />
        </button>

        <button
          onClick={stepZoom}
          title="Zoom step (paused)"
          className="p-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          <ZoomIn size={16} />
        </button>
      </div>
    </div>
  );
}

export const widgetMeta = {
  id: 'UPlotWidget',
  title: 'Scope',
  icon: LineChart as LucideIcon,
  component: UPlotWidget,
};
