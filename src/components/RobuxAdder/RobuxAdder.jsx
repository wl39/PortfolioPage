import React from "react";
import Robux from "./Robux";

const RobuxAdder = ({ correctAnswer }) => {
  const robuxComponents = Array.from({ length: correctAnswer }, (_, index) => (
    <Robux key={index} />
  ));

  return <div>{robuxComponents}</div>;
};

export default RobuxAdder;
