import React, { Component } from "react";

import styles from "./StopwatchPage.module.css";

import WorkerBuilder from "../worker/workerBuilder";
import stopwatchWorker from "../worker/stopwatchWorker";

import start from "../../assets/svgs/SandClockStart.svg";
import pause from "../../assets/svgs/SandClockPause.svg";
import end from "../../assets/svgs/SandClockEnd.svg";
import {
  getRecentStopwatch,
  getRecentStopwatchByPage,
  postStopwatch,
} from "../../services/api/StopwatchService";
import { formatToISO } from "../../utils/dateFormat";

const instance = new WorkerBuilder(stopwatchWorker);

class StopwatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      name: "",
      start: false,
      intervalID: null,
      elapsedTime: 0,
      isRunning: false,
      records: [
        <div className={styles.recordContainer} key="none">
          No record found.
        </div>,
      ],
      pages: [
        <div className={styles.pageContainer} key="none">
          1
        </div>,
      ],
      page: 1,
      size: 10,
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

    this.getRecentStopwatch();
  }

  getRecentStopwatch = async () => {
    try {
      const response = await getRecentStopwatch(this.state.size);

      this.makeRecord(response.data.content);
      this.makePage(response.data.pageable, response.data.totalPages);
    } catch (error) {
      console.error(error);

      window.alert("There is an issue...");
    }
  };

  getRecentStopwatchByPage = async (page) => {
    try {
      const response = await getRecentStopwatchByPage(this.state.size, page);

      this.makeRecord(response.data.content);
      this.makePage(response.data.pageable, response.data.totalPages);
    } catch (error) {
      console.error(error);

      window.alert("There is an issue...");
    }
  };

  makeRecord = (record) => {
    let records = [];

    let ago;
    let text;

    record.forEach((record) => {
      if (record.yearAgo > 0) {
        ago = record.yearAgo;
        text = record.yearAgo > 1 ? " years ago" : " year ago";
      } else if (record.monthAgo > 0) {
        ago = record.monthAgo;
        text = record.monthAgo > 1 ? " months ago" : " month ago";
      } else if (record.dayAgo > 0) {
        ago = record.dayAgo;
        text = record.dayAgo > 1 ? " days ago" : " day ago";
      } else if (record.hourAgo > 0) {
        ago = record.hourAgo;
        text = record.hourAgo > 1 ? " hours ago" : " hour ago";
      } else if (record.minAgo >= 0) {
        ago = record.minAgo;
        text = record.minAgo > 1 ? " minutes ago" : " minute ago";
      }

      records.push(
        <div className={styles.recordContainer} key={record.id}>
          <div
            className={
              record.type === "s" || record.type === "r"
                ? styles.start
                : record.type === "p"
                ? styles.pause
                : styles.reset
            }
          />
          <div className={styles.leftContainer}>
            <div className={styles.name}>{record.name}</div>
            <div className={styles.agos}>{ago + text}</div>
          </div>
          <div className={styles.rightContainer}>
            {record.type === "s" || record.type === "r"
              ? ""
              : this.formatTimeText(record.elapsedTime)}
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.sandClockIcon}
              alt="icon"
              src={
                record.type === "s" || record.type === "r"
                  ? start
                  : record.type === "p"
                  ? pause
                  : end
              }
            />
          </div>
        </div>
      );
    });

    this.setState({ records: records });
  };

  makePage = (pageable, totalPages) => {
    let pages = [];

    if (totalPages < 7) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          <div
            className={
              pageable.pageNumber === i
                ? styles.pageContainerSelected
                : styles.pageContainer
            }
            key={i}
            onClick={() => {
              this.getRecentStopwatchByPage(i);
            }}
          >
            {i + 1}
          </div>
        );
      }
    } else {
      if (pageable.pageNumber < 4) {
        for (let i = 0; i < 5; i++) {
          pages.push(
            <div
              className={
                pageable.pageNumber === i
                  ? styles.pageContainerSelected
                  : styles.pageContainer
              }
              key={i}
              onClick={() => {
                this.getRecentStopwatchByPage(i);
              }}
            >
              {i + 1}
            </div>
          );
        }

        pages.push(
          <div className={styles.dot} key={5}>
            ...
          </div>
        );
        pages.push(
          <div
            className={styles.pageContainer}
            key={totalPages - 1}
            onClick={() => {
              this.getRecentStopwatchByPage(totalPages - 1);
            }}
          >
            {totalPages}
          </div>
        );
      } else if (totalPages - pageable.pageNumber < 5) {
        pages.push(
          <div
            className={styles.pageContainer}
            key={0}
            onClick={() => {
              this.getRecentStopwatchByPage(0);
            }}
          >
            1
          </div>
        );
        pages.push(
          <div className={styles.dot} key={1}>
            ...
          </div>
        );
        for (let i = totalPages - 5; i < totalPages; i++) {
          pages.push(
            <div
              className={
                pageable.pageNumber === i
                  ? styles.pageContainerSelected
                  : styles.pageContainer
              }
              key={i}
              onClick={() => {
                this.getRecentStopwatchByPage(i);
              }}
            >
              {i + 1}
            </div>
          );
        }
      } else {
        pages.push(
          <div
            className={styles.pageContainer}
            key={0}
            onClick={() => {
              this.getRecentStopwatchByPage(0);
            }}
          >
            1
          </div>
        );
        pages.push(
          <div className={styles.dot} key={1}>
            ...
          </div>
        );
        for (
          let i = pageable.pageNumber - 2;
          i < pageable.pageNumber + 3;
          i++
        ) {
          pages.push(
            <div
              className={
                pageable.pageNumber === i
                  ? styles.pageContainerSelected
                  : styles.pageContainer
              }
              key={i}
              onClick={() => {
                this.getRecentStopwatchByPage(i);
              }}
            >
              {i + 1}
            </div>
          );
        }
        pages.push(
          <div className={styles.dot} key={totalPages - 2}>
            ...
          </div>
        );
        pages.push(
          <div
            className={styles.pageContainer}
            key={totalPages - 1}
            onClick={() => {
              this.getRecentStopwatchByPage(totalPages - 1);
            }}
          >
            {totalPages}
          </div>
        );
      }
    }

    this.setState({ page: pageable.pageNumber + 1, pages: pages });
  };

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

  startStopwatch = async () => {
    let id = -1;
    const data = {
      name: this.state.name ? this.state.name : "Anonymous",
      generatedDate: formatToISO(Date.now()),
      elapsedTime: this.state.elapsedTime,
      type: this.state.elapsedTime > 0 ? "r" : "s",
      relatedID: this.state.elapsedTime > 0 ? this.state.id : null,
    };

    try {
      const resId = await postStopwatch(
        data.name,
        data.generatedDate,
        data.elapsedTime,
        data.type,
        data.relatedID
      );

      id = this.state.elapsedTime > 0 ? this.state.id : resId;
    } catch (error) {
      console.error(error);

      window.alert("There is an issue...");
    } finally {
      instance.postMessage({
        elapsedTime: this.state.elapsedTime,
        intervalID: null,
        start: true,
      });
      this.setState({ isRunning: true, id: id });
      this.getRecentStopwatch();
    }
  };

  pauseStopwatch = async () => {
    const data = {
      name: this.state.name ? this.state.name : "Anonymous",
      relatedID: this.state.id,
      generatedDate: formatToISO(Date.now()),
      elapsedTime: this.state.elapsedTime,
      type: "p",
    };

    try {
      const resId = await postStopwatch(
        data.name,
        data.generatedDate,
        data.elapsedTime,
        data.type,
        data.relatedID
      );
      console.log(resId);
    } catch (error) {
      console.error(error);

      window.alert("There is an issue...");
    } finally {
      instance.postMessage({
        elapsedTime: this.state.elapsedTime,
        intervalID: this.state.intervalID,
      });
      this.setState({ isRunning: false });
      this.getRecentStopwatch();
    }
  };

  resetStopwatch = async () => {
    document.title = "Lim's portfolio";

    const data = {
      name: this.state.name ? this.state.name : "Anonymous",
      relatedID: this.state.id,
      generatedDate: formatToISO(Date.now()),
      elapsedTime: this.state.elapsedTime,
      type: "d",
    };

    try {
      const resId = await postStopwatch(
        data.name,
        data.generatedDate,
        data.elapsedTime,
        data.type,
        data.relatedID
      );
      console.log(resId);
    } catch (error) {
      console.error(error);

      window.alert("There is an issue...");
    } finally {
      instance.postMessage({
        elapsedTime: 0,
        intervalID: this.state.intervalID,
        start: false,
      });
      this.setState({ elapsedTime: 0, isRunning: false });
      this.getRecentStopwatch();
    }
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

  formatTimeText = (time) => {
    let text = "";

    if (time / 360000 >= 1) {
      text += `${String(parseInt(time / 360000))} `;
      if (time / 360000 >= 2) {
        text += "hours ";
      } else {
        text += "hour ";
      }
    }

    if ((time / 6000) % 60 >= 1) {
      text += `${String(parseInt((time / 6000) % 60))} `;
      if ((time / 6000) % 60 >= 2) {
        text += "minutes ";
      } else {
        text += "minute ";
      }
    }

    return text;
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

  nameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <div className={styles.stopwatch}>
          {this.formatTime(this.state.elapsedTime)}
        </div>
        <div className={styles.inputContainer}>
          <input
            disabled={this.state.start}
            placeholder="Type your name"
            onChange={this.nameHandler}
          />
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
        <div className={styles.records}>
          {this.state.records.map((record) => {
            return record;
          })}
        </div>
        <div className={styles.pages}>
          {this.state.pages.map((page) => {
            return page;
          })}
        </div>
      </div>
    );
  }
}

export default StopwatchPage;
