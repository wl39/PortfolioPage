import React, { useEffect, useRef, useState } from 'react';

const ScatterPlot = ({
  width,
  height,
  data,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
}) => {
  const canvasRef = useRef(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const paddingRatio = 0.1;
  const pointRadius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'ivory';
    ctx.fillRect(0, 0, width, height);

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

    // 눈금선 그리기
    const xStep = getDynamicGridStep(minX, maxX);
    const yStep = getDynamicGridStep(minY, maxY);

    ctx.strokeStyle = '#B1B1B1';
    ctx.lineWidth = 1;

    for (let y = Math.ceil(minY / yStep) * yStep; y <= maxY; y += yStep) {
      const py = scaleY(y);
      ctx.beginPath();
      ctx.moveTo(plotLeft, py);
      ctx.lineTo(plotRight, py);
      ctx.stroke();

      ctx.fillStyle = '#696D6E';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(y.toString(), plotLeft - 12, py);
    }

    for (let x = Math.ceil(minX / xStep) * xStep; x <= maxX; x += xStep) {
      const px = scaleX(x);
      // ctx.beginPath();
      // ctx.moveTo(px, plotTop);
      // ctx.lineTo(px, plotBottom);
      // ctx.stroke();

      ctx.fillStyle = '#696D6E';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(x.toString(), px, plotBottom + 12);
    }

    // 점 그리기
    data.forEach((point) => {
      const px = scaleX(point.x);
      const py = scaleY(point.y);
      ctx.beginPath();
      ctx.arc(px, py, pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#8BB479';
      ctx.fill();
      // ctx.strokeStyle = 'white';
      // ctx.stroke();
    });

    // 툴팁
    if (hoveredPoint) {
      const tooltipText = `(${hoveredPoint.x}, ${hoveredPoint.y}) ${hoveredPoint.title}`;
      ctx.font = '14px sans-serif';
      const padding = 8;
      const textWidth = ctx.measureText(tooltipText).width;
      const boxWidth = textWidth + padding * 2;
      const boxHeight = 24 + padding;

      ctx.fillStyle = '#696D6E';
      ctx.fillRect(mousePos.x + 10, mousePos.y - 25, boxWidth, boxHeight);
      ctx.fillStyle = 'white';
      ctx.fillText(
        tooltipText,
        mousePos.x + 10 + boxWidth / 2,
        mousePos.y - 25 - padding + boxHeight / 2
      );
    }

    // x축 라벨
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#696D6E';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, (plotLeft + plotRight) / 2, height - paddingY / 3 - 9);

    // y축 라벨 (세로 회전)
    ctx.save();
    ctx.translate(paddingX / 3 - 9, (plotTop + plotBottom) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
  }, [data, hoveredPoint, mousePos, width, height, xLabel, yLabel]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

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

    const closest = data.find(
      (pt) => Math.hypot(scaleX(pt.x) - x, scaleY(pt.y) - y) <= pointRadius + 3
    );
    setHoveredPoint(closest || null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      style={{ border: '1px solid #aaa', display: 'block' }}
    />
  );
};

function getDynamicGridStep(min, max) {
  const range = max - min;
  const stepOptions = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
  for (let step of stepOptions) {
    if (range / step <= 10) return step;
  }
  return 10000;
}

export default ScatterPlot;
