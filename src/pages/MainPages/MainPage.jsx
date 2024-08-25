import React from "react";
import styles from "./MainPage.module.css";

import image0 from "../../images/under_construction.png";

import Main from "./components/Main/Main";
import TimelinePage from "./components/Timeline/TimelinePage";
import Skills from "./components/Skills/Skills";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      underConsturction: false,
      firstActive: false,
      secondActive: false,
      thirdActive: false,
      thirdContentStyles: styles.thirdContent,
      fourthContentStyles: styles.fourthContent,
      fifthContentStyles: styles.fifthContent,
      skills1: styles.skills1,
      skills2: styles.skills2,
      skills3: styles.skills3,
      skills4: styles.skills4,
      skills5: styles.skills5,
      skills6: styles.skills6,
      skills7: styles.skills7,
      skills8: styles.skills8,
    };
  }

  componentDidMount() {
    let observer = new IntersectionObserver((e) => {
      e.forEach((components) => {
        if (components.isIntersecting) {
          switch (components.target.id) {
            case "firstContent":
              this.setState({
                firstActive: true,
              });
              break;
            case "secondContent":
              this.setState({
                secondActive: true,
              });
              break;
            case "thirdContent":
              this.setState({
                thirdActive: true,
                thirdContentStyles: styles.detailsContainer,
                skills1: styles.skills1,
                skills2: styles.skills2,
                skills3: styles.skills3,
                skills4: styles.skills4,
                skills5: styles.skills5,
                skills6: styles.skills6,
                skills7: styles.skills7,
                skills8: styles.skills8,
                skillsTitle: "Skills",
              });
              break;
            case "fourthContent":
              this.setState({
                fourthContentStyles: styles.fourthContent,
              });
              break;
            case "fifthContent":
              this.setState({
                fifthContentStyles: styles.fifthContent,
              });
              break;
            default:
              break;
          }
        } else {
          switch (components.target.id) {
            case "firstContent":
              this.setState({
                firstActive: false,
              });
              break;
            case "secondContent":
              this.setState({
                secondActive: false,
              });
              break;
            case "thirdContent":
              this.setState({
                thirdActive: false,
                thirdContentStyles: styles.detailsContainerMoved,
                skills1: styles.skills1Moved,
                skills2: styles.skills2Moved,
                skills3: styles.skills3Moved,
                skills4: styles.skills4Moved,
                skills5: styles.skills5Moved,
                skills6: styles.skills6Moved,
                skills7: styles.skills7Moved,
                skills8: styles.skills8Moved,
                skillsTitle: "Skills",
              });
              break;
            case "fourthContent":
              this.setState({
                fourthContentStyles: styles.fourthContentMoved,
              });
              break;
            case "fifthContent":
              this.setState({
                fifthContentStyles: styles.fifthContentMoved,
              });
              break;
            default:
              break;
          }
        }
      });
    });

    let firstContent = document.getElementById("firstContent");
    let secondContent = document.getElementById("secondContent");
    let thirdContent = document.getElementById("thirdContent");
    // let fourthContent = document.getElementById("fourthContent");
    // let fifthContent = document.getElementById("fifthContent");

    observer.observe(firstContent);
    observer.observe(secondContent);
    observer.observe(thirdContent);
    // observer.observe(fourthContent);
    // observer.observe(fifthContent);
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          {this.state.underConsturction ? (
            <div
              style={{ backgroundImage: `url(${image0})` }}
              className={styles.underConsturction}
            >
              <div className={styles.underConsturctionText}>
                Under Construction
              </div>
            </div>
          ) : null}
          <Main isActive={this.state.firstActive} />
          <TimelinePage isActive={this.state.secondActive} />
          <Skills isActive={this.state.thirdActive} />
          <div id="firstContent" className={styles.bar} />
          <div id="secondContent" className={styles.bar} />
          <div id="thirdContent" className={styles.bar} />

          <div />
        </div>
        <div className={styles.tablet}></div>
        <div className={styles.mobile}></div>
      </div>
    );
  }
}

export default MainPage;
