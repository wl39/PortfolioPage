import { useEffect, useRef, useState } from 'react';

function PieChart({ values, size = 300, fontSize = 14, gap = 4 }) {
  const canvasRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverOffsets, setHoverOffsets] = useState(
    Array(values.length).fill(0)
  );
  const animationRef = useRef(null);
  const [progress, setProgress] = useState(0); // 전체 애니메이션

  const radius = size / 2 - 10; // padding
  const centerX = size / 2;
  const centerY = size / 2;

  // 전체 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      let startAngle = -0.5 * Math.PI;

      values.forEach((slice, index) => {
        const fullAngle = (slice.percent / 100) * 2 * Math.PI;
        const angle = fullAngle * progress;
        const endAngle = startAngle + angle;

        const offset = hoverOffsets[index];
        const midAngle = (startAngle + endAngle) / 2;
        const dx = Math.cos(midAngle) * offset;
        const dy = Math.sin(midAngle) * offset;

        ctx.beginPath();
        ctx.moveTo(centerX + dx, centerY + dy);
        ctx.arc(centerX + dx, centerY + dy, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = slice.colour;
        ctx.fill();
        ctx.strokeStyle = 'ivory';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 텍스트 라벨
        if (angle > 0.3) {
          const labelX = centerX + dx + Math.cos(midAngle) * radius * 0.6;
          const labelY = centerY + dy + Math.sin(midAngle) * radius * 0.6;
          ctx.fillStyle = 'white';
          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${slice.value}`, labelX, labelY);
        }

        startAngle += fullAngle;
      });
    };

    draw();
  }, [hoverOffsets, progress, centerX, centerY, radius, size, values]);

  // 조각 확대 애니메이션 처리
  useEffect(() => {
    const animateOffset = () => {
      setHoverOffsets((prev) =>
        prev.map((v, i) => {
          const target = i === hoverIndex ? gap : 0;
          const delta = target - v;
          return Math.abs(delta) < 0.5 ? target : v + delta * 0.15;
        })
      );
      animationRef.current = requestAnimationFrame(animateOffset);
    };

    animationRef.current = requestAnimationFrame(animateOffset);
    return () => cancelAnimationFrame(animationRef.current);
  }, [hoverIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let angleCursor = Math.atan2(y - centerY, x - centerX);
      if (angleCursor < -0.5 * Math.PI) angleCursor += 2 * Math.PI;

      let currentAngle = -0.5 * Math.PI;
      let found = null;

      for (let i = 0; i < values.length; i++) {
        const sliceAngle = (values[i].percent / 100) * 2 * Math.PI;
        if (
          angleCursor >= currentAngle &&
          angleCursor < currentAngle + sliceAngle
        ) {
          found = i;
          break;
        }
        currentAngle += sliceAngle;
      }

      setHoverIndex(found);
    };

    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', () => setHoverIndex(null));

    return () => {
      canvas.removeEventListener('mousemove', handleMove);
    };
  }, [values, centerX, centerY]);

  // 전체 pie 등장 애니메이션
  useEffect(() => {
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(1, elapsed / 1000);
      setProgress(p);
      if (p < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [values]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  );
}

export default PieChart;
