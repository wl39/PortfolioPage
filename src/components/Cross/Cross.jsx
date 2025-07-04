export default function Cross({
  size = 30,
  line = size * 0.1,
  color = 'black',
  onClick,
  propStyles,
  propLineStyles,
}) {
  const lineWidth = line;

  const lineStyle = {
    position: 'absolute',
    top: 0,
    left: size / 2 - lineWidth / 2,
    width: `${lineWidth}px`,
    height: `${size}px`,
    backgroundColor: color,
  };

  return (
    <div
      className={propStyles}
      onClick={onClick}
      style={{
        position: 'relative',
        width: size,
        height: size,
        cursor: 'pointer',
      }}
    >
      <div
        className={propLineStyles}
        style={{ ...lineStyle, transform: 'rotate(45deg)' }}
      />
      <div
        className={propLineStyles}
        style={{ ...lineStyle, transform: 'rotate(-45deg)' }}
      />
    </div>
  );
}
