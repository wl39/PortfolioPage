import React, { Component } from "react";
class Timeline extends Component {
  componentDidMount() {
    console.log("?");
    const animatedElement = document.getElementById("timeline");
    animatedElement.addEventListener("transitionend", this.handleAnimationEnd);
  }

  componentWillUnmount() {
    console.log("!");
    const animatedElement = document.getElementById("timeline");
    animatedElement.removeEventListener(
      "transitionend",
      this.handleAnimationEnd
    );
  }

  handleAnimationEnd = () => {
    // Animation has ended, do something here
    console.log("Animation ended");
    this.props.transitionEndHandler();
  };
  render() {
    return <div id="timeline" className={this.props.className} />;
  }
}

export default Timeline;
