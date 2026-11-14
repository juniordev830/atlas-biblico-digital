import { useEffect, useRef, useState } from 'react';
import land from './land.json';
import { initialView, project, zoomTo } from './places.ts';
import type { Place, Point, View } from './places.ts';

const polygons = land as Point[][][];
type Props = { visible: Place[]; route: Place[]; selected: string; choose: (id: string) => void; view: View; setView: (value: View) => void };

export default function Map({ visible, route, selected, choose, view, setView }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { width, height } = size;

  useEffect(() => {
    if (!frame.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) });
    });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const context = canvas.current?.getContext('2d');
    if (!context || width === 0 || height === 0) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#192b39';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#39443f';
    context.strokeStyle = '#66746b';
    context.lineWidth = 1;
    for (const polygon of polygons) {
      context.beginPath();
      for (const ring of polygon) {
        ring.forEach((point, index) => {
          const [x, y] = project(point, view, width, height);
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
      }
      context.fill('evenodd');
      context.stroke();
    }
    if (route.length) {
      context.strokeStyle = '#f2cc86';
      context.lineWidth = 2;
      context.setLineDash([6, 5]);
      context.beginPath();
      route.forEach((place, index) => {
        const [x, y] = project(place.at, view, width, height);
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.stroke();
      context.setLineDash([]);
    }
  }, [width, height, view, route]);

  function shift(lon: number, lat: number) {
    setView({ ...view, lon: Math.max(5, Math.min(52, view.lon + lon / view.zoom)),
      lat: Math.max(20, Math.min(49, view.lat + lat / view.zoom)) });
  }

  const dots = visible.map(place => ({ place, point: project(place.at, view, width, height) }))
    .filter(({ point: [x, y] }) => x >= 12 && y >= 12 && x <= width - 12 && y <= height - 12);
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  return <div className="stack">
    <div className="atlas-frame" ref={frame} aria-label="Mapa interativo do Mediterrâneo e do Oriente Próximo" role="group">
      <canvas ref={canvas} width={width * ratio} height={height * ratio} aria-hidden="true" />
      {dots.map(({ place, point: [x, y] }) => <button key={place.id}
        aria-label={place.name + ' no mapa'} title={place.name} aria-pressed={selected === place.id}
        className="map-marker" data-status={place.status} style={{ left: x, top: y }}
        onClick={() => choose(place.id)}><span /></button>)}
      <span className="north" aria-hidden="true">↑ N</span>
    </div>
    <div className="row" aria-label="Controles do mapa">
      <button aria-label="Aproximar mapa" disabled={view.zoom >= 18} onClick={() => setView(zoomTo(view, 1.45))}>+</button>
      <button aria-label="Afastar mapa" disabled={view.zoom <= 1} onClick={() => setView(zoomTo(view, 1 / 1.45))}>−</button>
      <button aria-label="Mover para oeste" onClick={() => shift(-6, 0)}>←</button>
      <button aria-label="Mover para norte" onClick={() => shift(0, 4)}>↑</button>
      <button aria-label="Mover para sul" onClick={() => shift(0, -4)}>↓</button>
      <button aria-label="Mover para leste" onClick={() => shift(6, 0)}>→</button>
      <button onClick={() => setView(initialView)}>Visão geral</button>
    </div>
    <div className="tags" aria-label="Legenda"><span className="tag marker-key">Confirmada</span>
      <span className="tag marker-key traditional">Tradicional</span><span className="tag marker-key uncertain">Incerta</span>
      <span className="tag">Linha tracejada · ligação aproximada entre paradas</span>
    </div>
  </div>;
}
