import { useState } from 'react';

export default function Bar({ green, red, label, max, min, propStyles }) {
  const [barLabel, setL] = useState(label || 'none');
  const [barValue, setBarValue] = useState(green - red || 0);
  return (
    <div className={propStyles} style={{ width: '100px' }}>
      <div>{barValue}</div>
      <div
        style={{
          height: `100px`,
          // background: "green",
          width: '20px',
          margin: 'auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: `${green}px`,
            background: 'green',
            position: 'absolute',
            width: '100%',
            bottom: '0',
          }}
        />
      </div>
      <div
        style={{
          margin: 'auto',
          width: '30px',
          height: '2px',
          background: 'black',
        }}
      />
      <div
        style={{
          height: '100px',
        }}
      >
        <div
          style={{
            height: `${red}px`,
            background: 'red',
            width: '20px',
            margin: 'auto',
          }}
        />
      </div>
      <div>{barLabel}</div>
    </div>
  );
}
