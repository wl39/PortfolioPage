import React, { useState } from "react";

function CustomSelect({ title, select, candidates }) {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  const selectHandler = (value) => {
    setShow(false);
    setSelected(value);
    select(value);
  };
  return (
    <>
      {!show && (
        <div onClick={() => setShow(!show)}>
          {selected === "" ? title : selected}
        </div>
      )}
      {show &&
        candidates.map((value, index) => (
          <div key={index} onClick={() => selectHandler(value)}>
            {value}
          </div>
        ))}
    </>
  );
}

export default CustomSelect;
