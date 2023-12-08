import React, { Component } from "react";
import axios from "axios";

import styles from "./StopwatchPage.module.css";

import WorkerBuilder from "./worker/workerBuilder";
import stopwatchWorker from "./worker/stopwatchWorker";

const instance = new WorkerBuilder(stopwatchWorker);

const localUrl = "http://localhost:8080/api/v1/stopwatch";
// const localUrl = "https://91b.co.uk/api/v1/stopwatch";
class StopwatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      intervalID: null,
      elapsedTime: 0,
      isRunning: false,
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);

    instance.onmessage = (message) => {
      if (this.state.isRunning) {
        document.title = this.formatTimeTitle(message.data.elapsedTime);
        this.setState({
          elapsedTime: message.data.elapsedTime,
          intervalID: message.data.intervalID,
        });
      }
    };
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    instance.postMessage({
      elapsedTime: 0,
      intervalID: this.state.intervalID,
    });
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
      .post(localUrl, {
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
      .finally(() => {
        instance.postMessage({
          elapsedTime: this.state.elapsedTime,
          intervalID: null,
        });
        this.setState({ isRunning: true, id: id });
      });
  };

  pauseStopwatch = () => {
    // if (this.state.id > 0) {
    axios
      .post(localUrl, {
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
      })
      .finally(() => {
        instance.postMessage({
          elapsedTime: this.state.elapsedTime,
          intervalID: this.state.intervalID,
        });
        this.setState({ isRunning: false });
      });
    // }
  };

  resetStopwatch = () => {
    document.title = "Lim's portfolio";
    // if (this.state.id > 0) {
    axios
      .post(localUrl, {
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
      })
      .finally(() => {
        instance.postMessage({
          elapsedTime: 0,
          intervalID: this.state.intervalID,
        });
        this.setState({ elapsedTime: 0, isRunning: false });
      });
    // }
  };

  startStopwatchHandler = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.toLowerCase() === "start") {
        this.startStopwatch();
        this.setState({ isRunning: true });
        event.target.value = "";
      }
    }
  };

  pauseStopwatchHandler = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.toLowerCase() === "pause") {
        this.pauseStopwatch();
        this.setState({ isRunning: false });
        event.target.value = "";
      }
    }
  };

  resetStopwatchHandler = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.toLowerCase() === "reset") {
        this.setState({ isRunning: false });
        this.resetStopwatch();
        event.target.value = "";
      }
    }
  };

  formatTime = (time) => {
    return `${String(parseInt(time / 360000)).padStart(2, "0")}:${String(
      parseInt((time / 6000) % 60)
    ).padStart(2, "0")}:${String(parseInt((time / 100) % 60)).padStart(
      2,
      "0"
    )}.${String(time % 100).padStart(2, "0")}`;
  };

  formatTimeTitle = (time) => {
    if (time / 360000 >= 1) {
      return `${String(parseInt(time / 360000)).padStart(2, "0")}:${String(
        parseInt((time / 6000) % 60)
      ).padStart(2, "0")}:${String(parseInt((time / 100) % 60)).padStart(
        2,
        "0"
      )}`;
    } else {
      return `${String(parseInt((time / 6000) % 60)).padStart(2, "0")}:${String(
        parseInt((time / 100) % 60)
      ).padStart(2, "0")}`;
    }
  };

  render() {
    return (
      <div>
        <div className={styles.stopwatch}>
          {this.formatTime(this.state.elapsedTime)}
        </div>
        <div className={styles.inputContainer}>
          <input placeholder="Type your name" onChange={this.nameHandler} />
          {this.state.isRunning ? (
            <input
              placeholder="Type 'PAUSE' to pause"
              onKeyUp={this.pauseStopwatchHandler}
            />
          ) : (
            <input
              placeholder="Type 'START' to start"
              onKeyUp={this.startStopwatchHandler}
            />
          )}
          <input
            placeholder="Type 'RESET' to start"
            onKeyUp={this.resetStopwatchHandler}
          />
        </div>
      </div>
    );
  }
}

export default StopwatchPage;
