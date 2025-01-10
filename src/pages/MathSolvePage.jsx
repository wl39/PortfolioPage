import React, { useEffect, useState } from "react";
import MathQuestion from "../components/MathQuestion/MathQuestion";

const MathSolvePage = () => {
  const [time, setTime] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{time > 0 ? time : <MathQuestion />}</div>;
};

export default MathSolvePage;
