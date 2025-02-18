import React, { useEffect, useState } from "react";

const TempChild = ({ setA }) => {
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  useEffect(() => {
    console.log("hi?");
    setC((prev) => {
      if (prev < -5) setB(5);
      return prev - 1;
    });
    setA((prev) => prev - 2);
  }, [b, setA]);
  return (
    <button onClick={() => setB((prev) => prev + 1)}>click me! {b}</button>
  );
};

export default TempChild;
