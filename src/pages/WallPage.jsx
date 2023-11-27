import React from "react";
import styles from "./WallPage.module.css";

class WallPage extends React.Component {
  constructor(props) {
    super(props);

    let contents = [];

    contents.push({
      x: 0,
      y: 0,
      title: "Hello, Lim!",
      paragraph: "This is the wall page",
    });

    this.state = {
      contents: contents,
    };
  }

  //   componentDidMount() {
  //     this.state.contents.forEach((content) => {

  //     });
  //   }

  render() {
    return (
      <div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Wall</div>
          <div className={styles.subtitle}>
            You can post the message to Lim in this page
          </div>
          <div className={styles.wall}></div>
        </div>
      </div>
    );
  }
}

export default WallPage;
