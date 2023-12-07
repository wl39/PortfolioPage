import React, { Component } from "react";
import axios from "axios";

class StopwatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      elapsedTime: 0,
      isRunning: false,
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);

    this.interval = setInterval(() => {
      if (this.state.isRunning) {
        document.title = this.formatTimeTitle(this.state.elapsedTime);
        this.setState({
          elapsedTime: this.state.elapsedTime + 1,
        });
      }
    }, 10);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    clearInterval(this.interval);
  }

  handleBeforeUnload = (event) => {
    const message = "Are you sure you want to leave?";

    event.returnValue = message;

    // For some older browsers
    return message;
  };

  startStopwatch = () => {
    let id = -1;

    axios
      .post("http://localhost:8080/api/v1/stopwatch", {
        name: "Lim",
        generatedDate: new Date(Date.now()).toISOString().slice(0, 19),
        elapsedTime: this.state.elapsedTime,
        type: this.state.elapsedTime > 0 ? "r" : "s",
      })
      .then((response) => {
        id = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.setState({ isRunning: true, id: id });
      });
  };

  pauseStopwatch = () => {
    if (this.state.id > 0) {
      axios
        .post("http://localhost:8080/api/v1/stopwatch", {
          name: "Lim",
          relatedID: this.state.id,
          generatedDate: new Date(Date.now()).toISOString().slice(0, 19),
          elapsedTime: this.state.elapsedTime,
          type: "p",
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.setState({ isRunning: false });
  };

  resetStopwatch = () => {
    document.title = "Lim's portfolio";
    if (this.state.id > 0) {
      axios
        .post("http://localhost:8080/api/v1/stopwatch", {
          name: "Lim",
          relatedID: this.state.id,
          generatedDate: new Date(Date.now()).toISOString().slice(0, 19),
          elapsedTime: this.state.elapsedTime,
          type: "d",
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.setState({ elapsedTime: 0, isRunning: false });
  };

  pressEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.toLowerCase() === "start") {
        this.startStopwatch();
        this.setState({ isRunning: true });
        event.target.value = "";
      } else if (event.target.value.toLowerCase() === "reset") {
        this.setState({ isRunning: false });
        this.resetStopwatch();
        event.target.value = "";
      } else if (event.target.value.toLowerCase() === "pause") {
        this.pauseStopwatch();
        this.setState({ isRunning: false });
        event.target.value = "";
      }
    }
  };

  formatTime = (time) => {
    return `${String(parseInt(time / 360000)).padStart(2, "0")}:${String(
      parseInt(time / 6000)
    ).padStart(2, "0")}:${String(parseInt(time / 100)).padStart(
      2,
      "0"
    )}.${String(time % 100).padStart(2, "0")}`;
  };

  formatTimeTitle = (time) => {
    if (time / 360000 >= 1) {
      return `${String(parseInt(time / 360000)).padStart(2, "0")}:${String(
        parseInt(time / 6000)
      ).padStart(2, "0")}:${String(parseInt(time / 100)).padStart(2, "0")}`;
    } else {
      return `${String(parseInt(time / 6000)).padStart(2, "0")}:${String(
        parseInt(time / 100)
      ).padStart(2, "0")}`;
    }
  };

  render() {
    return (
      <div>
        <div>{this.formatTime(this.state.elapsedTime)}</div>

        {this.state.isRunning ? (
          <input
            placeholder="Type 'PAUSE' to pause"
            onKeyUp={this.pressEnter}
          />
        ) : (
          <input
            placeholder="Type 'START' to start"
            onKeyUp={this.pressEnter}
          />
        )}
        <input placeholder="Type 'RESET' to start" onKeyUp={this.pressEnter} />
      </div>
    );
  }
}

export default StopwatchPage;
