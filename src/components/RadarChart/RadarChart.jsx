import React, { useRef, useEffect } from 'react';

const RadarChart = ({ width, height, dataList, colors }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!dataList || dataList.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // 배경
    ctx.fillStyle = 'ivory';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = (Math.min(width, height) / 2) * 0.75;

    const count = dataList[0].data.length;
    const angleStep = (2 * Math.PI) / count;

    // 전체 최대값 계산
    const maxValue =
      Math.max(...dataList.flatMap((user) => user.data.map((d) => d.value))) ||
      1;

    // 축과 라벨
    ctx.strokeStyle = '#aaa';
    ctx.fillStyle = 'black';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.lineWidth = 0.5;

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius + 5);
      const y = centerY + Math.sin(angle) * (radius + 5);

      ctx.beginPath();

      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      ctx.fillText(dataList[0].data[i].label, labelX, labelY);
    }

    // 기준선 (5단계)
    ctx.lineWidth = 0.8;

    ctx.strokeStyle = '#ddd';
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

    // 각 유저의 값 그래프
    dataList.forEach((user, index) => {
      const fillColor = colors?.[index]?.fill || 'rgba(125,185,232,0.3)';
      const strokeColor = colors?.[index]?.stroke || '#7DB9E8';

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
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [dataList, width, height, colors]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid #aaa', background: 'ivory' }}
    />
  );
};

export default RadarChart;
