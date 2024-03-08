import React, { useState, useEffect } from "react";
import styles from "./AutoComplete.module.css";

function AutoComplete(props) {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [box, setBox] = useState();

  const binarySearch = (target) => {
    let result = [...list];
    if (target === "") {
      makeDivs(result);
      return;
    }

    let left = 0;
    let right = list.length - 1;
    let mid = 0;

    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (
        list[mid].substring(0, target.length).toLowerCase() <
        target.toLowerCase()
      ) {
        left = mid + 1;
      } else if (
        list[mid].substring(0, target.length).toLowerCase() >
        target.toLowerCase()
      ) {
        right = mid - 1;
      } else {
        break;
      }
    }

    if (left > mid || mid > right) {
      // meaning no result
      makeDivs([]);
      return;
    }

    // left
    left = mid;

    while (
      left >= 0 &&
      left < list.length &&
      list[left].substring(0, target.length).toLowerCase() ===
        target.toLowerCase()
    ) {
      left--;
    }

    // right
    right = mid;

    while (
      right >= 0 &&
      right < list.length &&
      list[right].substring(0, target.length).toLowerCase() ===
        target.toLowerCase()
    ) {
      right++;
    }

    result = [...result.slice(left + 1, right)];
    makeDivs(result);
  };

  const makeDivs = (array) => {
    let divs = [];
    array.forEach((value) => {
      divs.push(
        <div
          className={styles.element}
          key={value}
          onClick={() => selectValue(value)}
        >
          {value}
        </div>
      );
    });

    setBox(divs);
  };

  useEffect(() => {
    const makeDivs = (array) => {
      let divs = [];
      array.forEach((value) => {
        divs.push(
          <div
            className={styles.element}
            key={value}
            onClick={() => selectValue(value)}
          >
            {value}
          </div>
        );
      });

      setBox(divs);
    };

    fetch(props.data)
      .then((r) => r.text())
      .then((text) => {
        let array = text.split("\n");
        setList(array);
        makeDivs(array);
      });
  }, [props]);

  const selectValue = (value) => {
    setText(value);
    setShow(false);
  };

  const handleText = (event) => {
    // setShow(event.target.value !== "");
    setText(event.target.value);
    binarySearch(event.target.value);
  };

  const setShowTrue = () => {
    setShow(true);
  };

  return (
    <>
      <input onChange={handleText} onClick={setShowTrue} value={text} />
      {show ? <div>{box}</div> : null}
    </>
  );
}

export default AutoComplete;
