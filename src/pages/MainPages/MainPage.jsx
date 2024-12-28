import React from "react";
import styles from "./MainPage.module.css";

import image0 from "../../images/under_construction.webp";

import Main from "./components/Main/Main";
import TimelinePage from "./components/Timeline/TimelinePage";
// import Skills from "./components/Skills/Skills";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      underConsturction: false,
      firstActive: false,
      secondActive: false,
      thirdActive: false,
      fourthContentStyles: styles.fourthContent,
      fifthContentStyles: styles.fifthContent,
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

    observer.observe(firstContent);
    observer.observe(secondContent);
    observer.observe(thirdContent);
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
          {/* <Skills isActive={this.state.thirdActive} /> */}

          {/* <div> TEMP STARTS </div> */}
          <div
            className={
              this.state.thirdActive
                ? styles.detailsContainer
                : styles.detailsContainerMoved
            }
          >
            <div className={styles.portfolioPageTitle}>Projects (Korean)</div>
            <a
              href="https://c-lime.tistory.com/14"
              className={styles.portfoliPageLink}
            >
              Click here
            </a>
          </div>
          {/* <div>TEMP ENDS </div> */}
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
