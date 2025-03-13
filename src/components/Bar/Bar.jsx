import { useState } from "react";

export default function Bar({ value, label, max, min }) {
  const [barLabel, setL] = useState(label || "none");
  const [barValue, setBarValue] = useState(value || 0);
  return (
    <div style={{ width: "30px" }}>
      <div>{barValue}</div>
      <div
        style={{
          height: `100px`,
          // background: "green",
          width: "20px",
          margin: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "20px",
            background: "green",
            position: "absolute",
            width: "100%",
            bottom: "0",
          }}
        />
      </div>
      <div style={{ height: "2px", background: "black" }} />
      <div
        style={{
          height: `${value}px`,
          background: "red",
          width: "20px",
          margin: "auto",
        }}
      />
      <div>{barLabel}</div>
    </div>
  );
}
