import React, { Component } from "react";

class SpinnerWheelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      numElements: 0,
      elementInput: [],
      pie: [],
      degrees: [],
      intervalID: -1,
    };
  }

  inputHandler = (event) => {
    let elementInput = [];
    let numElements = event.target.value > 0 ? event.target.value : 0;
    let pie = [];
    let degrees = [];

    let colours = [
      "red",
      "blue",
      "yellow",
      "green",
      "orange",
      "purple",
      "pink",
      "brown",
      "grey",
      "black",
    ];

    let skweYDeg = 360 / event.target.value - 90;
    let rotateDeg = 360 / event.target.value;
    for (let i = 0; i < event.target.value; i++) {
      degrees.push(rotateDeg * i);
      elementInput.push(<input placeholder="element" key={i} />);

      pie.push(
        <div
          key={i}
          style={{
            transformOrigin: "0% 100%",
            top: 0,
            right: 0,
            position: "absolute",
            transform:
              "rotate(" + rotateDeg * i + "deg) skewY(" + skweYDeg + "deg)",
            background: colours[i],
            width: "50%",
            height: "50%",
          }}
        />
      );
    }
    this.setState({
      numElements: numElements,
      elementInput: elementInput,
      pie: pie,
      degrees: degrees,
    });
  };

  spin = () => {
    if (this.state.intervalID === -1) {
      let spinner = document.getElementById("spinner");
      let counter = 0;
      let id = setInterval(() => {
        //   counter == 360 ? (counter -= 360) : (counter += 13);
        counter += 7;
        spinner.style.transform = "rotate(" + counter + "deg)";
      }, 7.7);

      this.setState({
        intervalID: id,
      });
    }
  };

  stop = () => {
    let spinner = document.getElementById("spinner");
    let degree =
      spinner.style.transform.replace("rotate(", "").replace("deg)", "") % 360;
    console.log(degree);

    for (let i = 0; i < this.state.degrees.length - 1; i++) {
      if (
        degree >= this.state.degrees[i] &&
        degree < this.state.degrees[i + 1]
      ) {
        console.log(i);
        break;
      }
    }

    if (
      this.state.degrees[this.state.degrees.length - 1] <= degree &&
      degree < 360
    ) {
      console.log(this.state.degrees.length - 1);
    }
    clearInterval(this.state.intervalID);

    this.setState({
      intervalID: -1,
    });
  };

  render() {
    return (
      <div>
        <input
          placeholder="Number of Elements"
          onChange={this.inputHandler}
          type="number"
        />
        {this.state.elementInput}
        <div
          id="spinner"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
            width: "200px",
            height: "200px",
            marginTop: "200px",
            transition: "transform 1.5s ease-out",
          }}
        >
          {this.state.pie}
        </div>
        <div style={{ marginTop: "200px" }}>
          <button disabled={this.state.intervalID !== -1} onClick={this.spin}>
            START
          </button>
          <button disabled={this.state.intervalID === -1} onClick={this.stop}>
            STOP
          </button>
        </div>
      </div>
    );
  }
}

export default SpinnerWheelPage;
