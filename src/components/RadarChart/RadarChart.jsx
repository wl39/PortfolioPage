import React, { useRef, useEffect, useState } from 'react';

const RadarChart = ({ size = 300, values, colors, fontSize = 12 }) => {
  const canvasRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const width = size;
    const height = size;

    if (!values || values.length === 0) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'ivory';
    ctx.fillRect(0, 0, width, height);

    const padding = 40;
    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = Math.min(width, height) / 2 - padding;

    const count = values[0].data.length;
    const angleStep = (2 * Math.PI) / count;

    const maxValue =
      Math.max(...values.flatMap((user) => user.data.map((d) => d.value))) || 1;

    ctx.strokeStyle = '#aaa';
    ctx.fillStyle = 'black';
    ctx.font = `${fontSize}px sans-serif`;
    ctx.lineWidth = 0.5;

    const labelPositions = [];

    // Helper: trim label with ellipsis if too wide
    const trimLabel = (text, maxWidth) => {
      let trimmed = text;
      while (ctx.measureText(trimmed).width > maxWidth && trimmed.length > 0) {
        trimmed = trimmed.slice(0, -1);
      }
      return trimmed.length < text.length
        ? trimmed.slice(0, -1) + '…'
        : trimmed;
    };

    // Draw axes and labels
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      const label = values[0].data[i].label;
      const labelX = centerX + Math.cos(angle) * (radius + 10);
      const labelY = centerY + Math.sin(angle) * (radius + 10);
      labelPositions.push({ x: labelX, y: labelY, index: i });

      const maxTextWidth = size * 0.2;
      const trimmed = trimLabel(label, maxTextWidth);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(trimmed, labelX, labelY);
    }

    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.8;

    for (let step = 1; step <= 5; step++) {
      const stepRadius = (radius * step) / 5;
      ctx.beginPath();
      if (step !== 5) ctx.setLineDash([5, 5]);

      for (let i = 0; i < count; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * stepRadius;
        const y = centerY + Math.sin(angle) * stepRadius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw polygons
    values.forEach((user, userIndex) => {
      const fillColor = colors?.[userIndex]?.fill || 'rgba(125,185,232,0.3)';
      const strokeColor = colors?.[userIndex]?.stroke || '#7DB9E8';

      ctx.beginPath();
      user.data.forEach((point, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const ratio = point.value / maxValue;
        const x = centerX + Math.cos(angle) * radius * ratio;
        const y = centerY + Math.sin(angle) * radius * ratio;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = userIndex === 0 && hoverIndex !== null ? 3 : 2;
      ctx.stroke();
    });

    // Hover logic
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;

      for (let i = 0; i < labelPositions.length; i++) {
        const { x, y } = labelPositions[i];
        const dx = mouseX - x;
        const dy = mouseY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
          found = i;
          break;
        }
      }

      if (found !== null) {
        const point = values[0].data[found];
        const percent = Math.round((point.value / maxValue) * 100);
        setTooltip({
          label: point.label,
          value: `${percent}%`,
          x: centerX,
          y: centerY,
        });
        setHoverIndex(found);
      } else {
        setTooltip(null);
        setHoverIndex(null);
      }
    };

    const handleMouseLeave = () => {
      setTooltip(null);
      setHoverIndex(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [values, size, colors, fontSize, hoverIndex]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ display: 'block' }}
      />
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -50%)',
            background: 'ivory',
            color: 'black',
            padding: '6px 10px',
            fontSize: fontSize,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: '2px solid black',
            boxShadow: '2px 2px black',
          }}
        >
          <div>
            <strong>{tooltip.label}</strong>
          </div>
          <div>{tooltip.value}</div>
        </div>
      )}
    </div>
  );
};

export default RadarChart;
