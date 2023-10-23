import React from "react";
import styles from "./MainPagePrev.module.css";
import portrait from "../assets/lim_cropped.jpg";
import CustomCard from "../components/CustomCard/CustomCard";

import reactLogo from "../assets/React-icon.svg";
import javascriptLogo from "../assets/JavaScript-logo.png";
import springBootLogo from "../assets/spring-2.svg";

import javaLogo from "../assets/java-icon.svg";
import mariadbLogo from "../assets/MariaDB_colour_logo.svg";
import nodejsLogo from "../assets/Node.js_logo.svg";

// import gitHubLogo from "../assets/gitHub.png";
// import { IconButton } from "@mui/material";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstContentStyles: styles.firstContent,
      secondContentStyles: styles.secondContent,
      thirdContentStyles: styles.thirdContent,
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
                firstContentStyles: styles.firstContent,
              });
              break;
            case "secondContent":
              this.setState({
                secondContentStyles: styles.secondContent,
              });
              break;
            case "thirdContent":
              this.setState({
                thirdContentStyles: styles.thirdContent,
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
                firstContentStyles: styles.firstContentMoved,
              });
              break;
            case "secondContent":
              this.setState({
                secondContentStyles: styles.secondContentMoved,
              });
              break;
            case "thirdContent":
              this.setState({
                thirdContentStyles: styles.thirdContentMoved,
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
    let fourthContent = document.getElementById("fourthContent");
    // let fifthContent = document.getElementById("fifthContent");

    observer.observe(firstContent);
    observer.observe(secondContent);
    observer.observe(thirdContent);
    observer.observe(fourthContent);
    // observer.observe(fifthContent);
  }
  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={this.state.firstContentStyles}>
          <div id="firstContent" />
          <div className={styles.circle} />
          <img src={portrait} alt="lim" className={styles.portrait} />
          <div className={styles.textContainer}>
            <h3 className={styles.greeting}>Hello! My name is</h3>
            <h1 className={styles.name}>Wankyu Lim</h1>

            <p className={styles.focusingPoints}>
              I graduated the University of St Andrews (Class of 2023) with
              Upper Second Class <b>(II.1)</b>. I did few projects by myself
              which were mainly focusing on making the websites. My main
              programming languages are <b>Java</b> and <b>JavaScript</b>. To
              make the websites, I mainly used <b>React</b> framework.
            </p>
          </div>
          {/* <h3 className={styles.gitHubText}>
            You can check the projects on GitHub!
          </h3>
          <IconButton>
            <img src={gitHubLogo} className={styles.gitHubIcon} />
          </IconButton> */}
        </div>

        <div className={this.state.secondContentStyles}>
          <div className={styles.leftCircle} />
          <div className={styles.rightCircle} />
          <div className={styles.secondContentTracker} id="secondContent" />
          <div className={styles.textContainer}>
            <h1 className={styles.name}>Main Skills</h1>
          </div>
          <div className={styles.cardContainer}>
            <CustomCard
              title="React"
              logo={reactLogo}
              description={
                <div>
                  <b className={styles.cardBold}>Since 2018</b>, I have
                  implemented a total of 5 large and small websites using React.
                  Since I understand component structure well and know{" "}
                  <b className={styles.cardBold}>HTML5</b> and{" "}
                  <b className={styles.cardBold}>CSS</b>, I can develop natural{" "}
                  <b className={styles.cardBold}>responsive</b>
                  websites in terms of <b className={styles.cardBold}>UI/UX</b>.
                </div>
              }
            />
            <CustomCard
              title="JavaScript"
              logo={javascriptLogo}
              description={
                <div>
                  JavaScript is one of{" "}
                  <b className={styles.cardBold}>
                    my main programming language
                  </b>
                  . Since this language is using for the web application, this
                  language updates frequently. Therefore, I{" "}
                  <b className={styles.cardBold}>
                    always study the cutting-edge technologies
                  </b>{" "}
                  via many different media. Escpecially, I get the information
                  from <b className={styles.cardBold}>ECMA</b> and{" "}
                  <b className={styles.cardBold}>MDN Web Docs</b>. Not only
                  studying from the official website, I also check{" "}
                  <b className={styles.cardBold}>JavaScript Weekly</b>,{" "}
                  <b className={styles.cardBold}>GitHub Trending</b> and{" "}
                  <b className={styles.cardBold}>Twitter</b> to follow up the
                  trends.
                </div>
              }
            />
            <CustomCard
              title="Spring Boot"
              logo={springBootLogo}
              description={<div></div>}
            />
          </div>
          <div className={styles.cardContainer}>
            <CustomCard
              title="Java"
              logo={javaLogo}
              description={
                <div>
                  <b className={styles.cardBold}>Since 2018</b>, I have
                  implemented a total of 5 large and small websites using React.
                  Since I understand component structure well and know{" "}
                  <b className={styles.cardBold}>HTML5</b> and{" "}
                  <b className={styles.cardBold}>CSS</b>, I can develop natural{" "}
                  <b className={styles.cardBold}>responsive</b>
                  websites in terms of <b className={styles.cardBold}>UI/UX</b>.
                </div>
              }
            />
            <CustomCard
              title="MariaDB"
              logo={mariadbLogo}
              description={
                <div>
                  JavaScript is one of{" "}
                  <b className={styles.cardBold}>
                    my main programming language
                  </b>
                  . Since this language is using for the web application, this
                  language updates frequently. Therefore, I{" "}
                  <b className={styles.cardBold}>
                    always study the cutting-edge technologies
                  </b>{" "}
                  via many different media. Escpecially, I get the information
                  from <b className={styles.cardBold}>ECMA</b> and{" "}
                  <b className={styles.cardBold}>MDN Web Docs</b>. Not only
                  studying from the official website, I also check{" "}
                  <b className={styles.cardBold}>JavaScript Weekly</b>,{" "}
                  <b className={styles.cardBold}>GitHub Trending</b> and{" "}
                  <b className={styles.cardBold}>Twitter</b> to follow up the
                  trends.
                </div>
              }
            />
            <CustomCard
              title="Node.js"
              logo={nodejsLogo}
              description={<div></div>}
            />
          </div>
        </div>

        <div className={this.state.thirdContentStyles}>
          <div className={styles.thirdContentTracker} id="thirdContent" />
          <div className={styles.textContainer}>
            <h1 className={styles.name}>Projects</h1>
          </div>
        </div>

        <div className={this.state.fourthContentStyles}>
          <div className={styles.fourthContentTracker} id="fourthContent" />
          <div className={styles.textContainer}>
            <h1 className={styles.name}>Careers</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
