import React, { useEffect, useRef, useState } from 'react';

const LineGraph = ({
  width,
  height,
  data,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
}) => {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const paddingRatio = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !data || data.length < 2) return;

    // Clear & background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'ivory';
    ctx.fillRect(0, 0, width, height);

    // padding and plot bounds
    const paddingX = width * paddingRatio;
    const paddingY = height * paddingRatio;
    const plotLeft = paddingX;
    const plotRight = width - paddingX;
    const plotTop = paddingY;
    const plotBottom = height - paddingY;

    // scale functions
    const xs = data.map((d) => d.x);
    const ys = data.map((d) => d.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const scaleX = (x) =>
      plotLeft + ((x - minX) / (maxX - minX || 1)) * (plotRight - plotLeft);
    const scaleY = (y) =>
      plotBottom - ((y - minY) / (maxY - minY || 1)) * (plotBottom - plotTop);

    // draw gridlines and axis labels
    const xStep = getDynamicGridStep(minX, maxX);
    const yStep = getDynamicGridStep(minY, maxY);

    ctx.strokeStyle = '#B1B1B1';
    ctx.lineWidth = 1;
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#696D6E';

    ctx.lineWidth = 0.5;
    for (let y = Math.ceil(minY / yStep) * yStep; y <= maxY; y += yStep) {
      const py = scaleY(y);
      ctx.beginPath();
      ctx.moveTo(plotLeft, py);
      ctx.lineTo(plotRight, py);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(y.toString(), plotLeft - 12, py);
    }

    for (let x = Math.ceil(minX / xStep) * xStep; x <= maxX; x += xStep) {
      const px = scaleX(x);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(x.toString(), px, plotBottom + 12);
    }

    // draw line (without dots)
    ctx.beginPath();
    data.forEach((point, idx) => {
      const px = scaleX(point.x);
      const py = scaleY(point.y);
      if (idx === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    });
    ctx.strokeStyle = '#8BB479';

    ctx.lineWidth = 3;
    if (isHovered) ctx.lineWidth = 6;
    ctx.stroke();

    // x-axis label
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#696D6E';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, (plotLeft + plotRight) / 2, height - paddingY / 3 - 9);

    // y-axis label (rotated)
    ctx.save();
    ctx.translate(paddingX / 3 - 9, (plotTop + plotBottom) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
  }, [data, width, height, xLabel, yLabel, isHovered]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !data || data.length < 2) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // padding and plot bounds
    const paddingX = width * paddingRatio;
    const paddingY = height * paddingRatio;
    const plotLeft = paddingX;
    const plotRight = width - paddingX;
    const plotTop = paddingY;
    const plotBottom = height - paddingY;

    const xs = data.map((d) => d.x);
    const ys = data.map((d) => d.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const scaleX = (x) =>
      plotLeft + ((x - minX) / (maxX - minX || 1)) * (plotRight - plotLeft);
    const scaleY = (y) =>
      plotBottom - ((y - minY) / (maxY - minY || 1)) * (plotBottom - plotTop);

    let isOnLine = false;
    const threshold = 8; // 허용 거리

    for (let i = 0; i < data.length - 1; i++) {
      const p1 = {
        x: scaleX(data[i].x),
        y: scaleY(data[i].y),
      };
      const p2 = {
        x: scaleX(data[i + 1].x),
        y: scaleY(data[i + 1].y),
      };

      const dist = pointToSegmentDistance({ x, y }, p1, p2);
      if (dist <= threshold) {
        isOnLine = true;
        break;
      }
    }

    setIsHovered(isOnLine);
  };

  // 선분과 점 사이 거리 계산 함수
  function pointToSegmentDistance(p, v, w) {
    const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);

    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));

    const proj = {
      x: v.x + t * (w.x - v.x),
      y: v.y + t * (w.y - v.y),
    };

    return Math.hypot(p.x - proj.x, p.y - proj.y);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid #aaa', display: 'block' }}
      onMouseMove={handleMouseMove}
    />
  );
};

// same as ScatterPlot 기준
function getDynamicGridStep(min, max) {
  const range = max - min;
  const stepOptions = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  for (let step of stepOptions) {
    if (range / step <= 10) return step;
  }
  return 10000;
}

export default LineGraph;
