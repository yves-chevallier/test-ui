import { useEffect, useRef } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

export default function UPlotWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const plotRef = useRef<uPlot | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const data = [
      Array.from({ length: 100 }, (_, i) => i),             // x
      Array.from({ length: 100 }, (_, i) => Math.sin(i/10)) // y
    ];

    const options: uPlot.Options = {
      width: containerRef.current.clientWidth,
      height: 300,
      series: [
        {},
        { label: "Signal", stroke: "blue" }
      ],
      axes: [
        {},
        {}
      ]
    };

    plotRef.current = new uPlot(options, data, containerRef.current);

    return () => {
      plotRef.current?.destroy();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
