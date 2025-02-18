import React, { useState } from "react";
import TempChild from "./TempChild";

const Temp = () => {
  const [a, setA] = useState(0);

  return (
    <div>
      <div>hi</div>
      <div>{a}</div>
      <TempChild setA={setA} />
    </div>
  );
};

export default Temp;
