import React, { useState, useRef } from 'react';

function DragAndDrop({ children, x, y }) {
  // State to track the current position of the component
  const [position, setPosition] = useState({ x: x, y: y });
  const [hide, setHide] = useState(true);

  // State to track the offset between the click point and component's top-left corner
  const offset = useRef({ x: 0, y: 0 });

  // Handle mouse down event
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default browser drag behavior

    // Calculate the offset between the click point and the component's position
    const element = e.target.getBoundingClientRect();

    offset.current = {
      x: e.clientX - element.left,
      y: e.clientY - element.top,
    };

    // Add mouse move and mouse up listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    // Remove mouse move and mouse up listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          background: 'transparent',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex' }}>
          <div
            onMouseDown={handleMouseDown}
            style={{
              boxSizing: 'border-box',
              // position: 'fixed',
              // left: position.x,
              // top: position.y,
              width: '40px',
              height: '40px',
              backgroundColor: 'ivory',
              cursor: 'move',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              fontWeight: 'bold',
              userSelect: 'none',
              border: '1px solid black',
              borderBottom: hide ? '1px solid black' : '0px',
              fontSize: '20px',
              zIndex: 10,
            }}
          >
            M
          </div>
          <div
            onClick={() => setHide(!hide)}
            style={{
              // position: 'fixed',
              boxSizing: 'border-box',
              // left: position.x + 40,
              // top: position.y,
              width: '40px',
              height: '40px',
              backgroundColor: 'ivory',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              fontWeight: 'bold',
              userSelect: 'none',
              border: '1px solid black',
              borderBottom: hide ? '1px solid black' : '0px',
              zIndex: 10,
            }}
          >
            {hide ? (
              <div
                style={{
                  marginTop: 2,
                  width: 0,
                  height: 0,
                  borderTop: '14px solid black',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                }}
              />
            ) : (
              <div
                style={{
                  marginTop: 0,
                  width: 0,
                  height: 0,
                  borderBottom: '14px solid black',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                }}
              />
            )}
          </div>
        </div>
        <div style={{ display: hide ? 'none' : 'block' }}>{children}</div>
      </div>
    </div>
  );
}

export default DragAndDrop;
