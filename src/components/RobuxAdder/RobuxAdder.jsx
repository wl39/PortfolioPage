import React from "react";
import Robux from "./Robux";

const RobuxAdder = ({ correctAnswer, wrongAnswer }) => {
  const robuxComponents = Array.from({ length: correctAnswer }, (_, index) => (
    <Robux key={index} />
  ));

  return (
    <div>
      <div style={{ fontSize: "24px", fontWeight: "200" }}>
        Total Robux: {`${(correctAnswer - wrongAnswer) * 10}`}
      </div>
      <div>{robuxComponents}</div>
    </div>
  );
};

export default RobuxAdder;
