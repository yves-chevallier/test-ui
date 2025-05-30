import { defineWidget } from './WidgetBase';
import { type LucideIcon, Radar } from 'lucide-react';
import { type WidgetComponentProps } from '@/widgets/WidgetBase';
import { useEffect, useRef } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { cssVarToHex } from '@/lib';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const EncoderWidget: React.FC<WidgetComponentProps> = ({ api }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const plotRef = useRef<uPlot | null>(null);

  useEffect(() => {
    api.onMount = () => console.log('Mounted EncoderWidget');
    api.onUnmount = () => console.log('Unmounted EncoderWidget');
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let created = false;

    const observer = new ResizeObserver(() => {
      if (plotRef.current || !container.clientWidth || !container.clientHeight || created) return;
      created = true;

      const axisColor = cssVarToHex('--foreground');
      const gridColor = cssVarToHex('--border');
      const chartColor = cssVarToHex('--chart-1');

      const opts = {
        title: 'Encoder',
        width: 400,
        height: 400,
        pxAlign: false,
        stroke: 'white',
        scales: {
          y: {
            range: (): [number, number] => [-1.5, 1.5],
          },
          x: {
            time: false,
            range: (): [number, number] => [-1.5, 1.5],
          },
        },
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
        series: [
          {},
          {
            label: 'Encoder',
            stroke: chartColor,
            width: 1,
            points: { space: 0 },
          },
        ],
        plugins: [
          {
            hooks: {
              draw: (u: uPlot) => {
                const canvas = u.root.querySelector('canvas') as HTMLCanvasElement | null;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const bbox = u.bbox;
                const x = u.valToPos(0, 'x') + bbox.left;
                const y = u.valToPos(0, 'y') + bbox.top;

                const limitColor = cssVarToHex('--primary');

                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([4, 4]);
                ctx.strokeStyle = limitColor;
                ctx.lineWidth = 1;
                ctx.arc(x, y, 30, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.beginPath();
                ctx.setLineDash([4, 4]);
                ctx.strokeStyle = limitColor;
                ctx.lineWidth = 1;
                ctx.arc(x, y, 130, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.restore();
              },
            },
          },
        ],
      };

      plotRef.current = new uPlot(opts, [[0], [0]], container);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col -full">
      <div ref={containerRef} className="flex-1 w-full" />
      <div className="p-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an encoder" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Encoder</SelectLabel>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const widgetMeta = defineWidget({
  id: 'EncoderWidget',
  title: 'Encoder Raw Signals',
  icon: Radar as LucideIcon,
  component: EncoderWidget,
});
