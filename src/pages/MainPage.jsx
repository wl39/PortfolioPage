import React from "react";
import styles from "./MainPage.module.css";
import logo from "../assets/logo512.png";
import Slider from "../components/Slider/Slider";

import image1 from "../images/1651807930774_Original-modified.jpg";
import image2 from "../images/1645053171211_Original-modified.jpg";
import image3 from "../images/1600685054178_Original-modified.jpg";
import image4 from "../images/20191018_2120280_Original-modified.jpg";
import image5 from "../images/IMG_1339-modified.JPG";
import image6 from "../images/IMG_2131-modified.JPG";
import CircleAnimation from "../components/CircleAnimation/CircleAnimation";
// import TimelineDetailBox from "../components/TimelineDetailBox/TimelineDetailBox";
// import TimelineFurtherInformation from "../components/TimelineFurherInformation/TimelineFurtherInformation";
import TimelineDetail from "../components/TimelineDetail/TimelineDetail";
import SkillDetail from "../components/SkillDetail/SkillDetail";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstContentStyles: styles.mainContainer,
      secondContentStyles: styles.detailsContainer,
      secondActive: false,
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
      skillsTitle: "Skills",
      timelineStyles: styles.timelineLine,
      timelineDetails1: styles.timelineDetails1,
      timelineDetails2: styles.timelineDetails2,
      timelineDetails3: styles.timelineDetails3,
      timelineDetails4: styles.timelineDetails4,
      timelineDetails4Bottom: styles.timelineDetails4Bottom,
      timelineDetails5: styles.timelineDetails5,
      timelineDetails6: styles.timelineDetails6,
      timelineDetails6Bottom: styles.timelineDetails6Bottom,
      timelineDetails7: styles.timelineDetails7,
      timelineBorder1: styles.timelineBorder1,
      timelineBorder2: styles.timelineBorder2,
      timelineBorder3: styles.timelineBorder3,
      timelineBorder4: styles.timelineBorder4,
      timelineBorder5: styles.timelineBorder5,
      timelineBorder6: styles.timelineBorder6,
      timelineBorder6Helper: styles.timelineBorder6Helper,
      timelineBorder7: styles.timelineBorder7,
      timelineBorder7Helper: styles.timelineBorder7Helper,
      timelineTitle: "Timeline",
      timelineImages: [],
      timelineDetails: null,
      // timelineDetailContaier:
    };
  }

  componentDidMount() {
    let observer = new IntersectionObserver((e) => {
      e.forEach((components) => {
        if (components.isIntersecting) {
          switch (components.target.id) {
            case "firstContent":
              this.setState({
                firstContentStyles: styles.mainContainer,
              });
              break;
            case "secondContent":
              this.setState({
                secondContentStyles: styles.timelineContainer,
                secondActive: true,
                timelineStyles: styles.timelineLine,
                timelineBorder1: styles.timelineBorder1,
                timelineBorder2: styles.timelineBorder2,
                timelineBorder3: styles.timelineBorder3,
                timelineBorder4: styles.timelineBorder4,
                timelineBorder5: styles.timelineBorder5,
                timelineBorder6: styles.timelineBorder6,
                timelineBorder6Helper: styles.timelineBorder6Helper,
                timelineBorder7: styles.timelineBorder7,
                timelineDetails1: styles.timelineDetails1,
                timelineDetails2: styles.timelineDetails2,
                timelineDetails3: styles.timelineDetails3,
                timelineDetails4: styles.timelineDetails4,
                timelineDetails4Bottom: styles.timelineDetails4Bottom,
                timelineDetails5: styles.timelineDetails5,
                timelineDetails6: styles.timelineDetails6,
                timelineDetails6Bottom: styles.timelineDetails6Bottom,
                timelineDetails7: styles.timelineDetails7,
                timelineBorder7Helper: styles.timelineBorder7Helper,
              });
              break;
            case "thirdContent":
              this.setState({
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
                firstContentStyles: styles.mainContainerMoved,
              });
              break;
            case "secondContent":
              this.setState({
                secondContentStyles: styles.timelineContainerMoved,
                secondActive: false,
                timelineStyles: styles.timelineLineMoved,
                timelineBorder1: styles.timelineBorder1Moved,
                timelineBorder2: styles.timelineBorder2Moved,
                timelineBorder3: styles.timelineBorder3Moved,
                timelineBorder4: styles.timelineBorder4Moved,
                timelineBorder5: styles.timelineBorder5Moved,
                timelineBorder6: styles.timelineBorder6Moved,
                timelineBorder6Helper: styles.timelineBorder6HelperMoved,
                timelineBorder7: styles.timelineBorder7Moved,
                timelineDetails1: styles.timelineDetails1Moved,
                timelineDetails2: styles.timelineDetails2Moved,
                timelineDetails3: styles.timelineDetails3Moved,
                timelineDetails4: styles.timelineDetails4Moved,
                timelineDetails4Bottom: styles.timelineDetails4BottomMoved,
                timelineDetails5: styles.timelineDetails5Moved,
                timelineDetails6: styles.timelineDetails6Moved,
                timelineDetails6Bottom: styles.timelineDetails6BottomMoved,
                timelineDetails7: styles.timelineDetails7Moved,
                timelineBorder7Helper: styles.timelineBorder7HelperMoved,
                timelineTitle: "Timeline",
              });
              break;
            case "thirdContent":
              this.setState({
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

  timelineDetailHandler = (contentsTitle) => {
    let details;
    switch (contentsTitle) {
      case "First year in University of St Andrews":
        details = (
          <TimelineDetail
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                title: "Co-found the company: Bonoware",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS1002: Object-Oriented Programming",
                  "CS1003: Programming with Data",
                  "CS1005: Computer Science in Everyday Life",
                  "CS1006: Programming Projects",
                  "MT1002: Mathematics",
                  "MT1003: Pure and Applied Mathematics",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
            ]}
          />
        );
        break;
      case "Second year in University of St Andrews":
        details = (
          <TimelineDetail
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                title: "Co-found the company: Bonoware",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS1002: Object-Oriented Programming",
                  "CS1003: Programming with Data",
                  "CS1005: Computer Science in Everyday Life",
                  "CS1006: Programming Projects",
                  "MT1002: Mathematics",
                  "MT1003: Pure and Applied Mathematics",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
            ]}
          />
        );
        break;
      case "Served for National Duty":
        details = (
          <TimelineDetail
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                title: "Co-found the company: Bonoware",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS1002: Object-Oriented Programming",
                  "CS1003: Programming with Data",
                  "CS1005: Computer Science in Everyday Life",
                  "CS1006: Programming Projects",
                  "MT1002: Mathematics",
                  "MT1003: Pure and Applied Mathematics",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
            ]}
          />
        );
        break;
      case "Third year in University of St Andrews":
        details = (
          <TimelineDetail
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                title: "Co-found the company: Bonoware",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS1002: Object-Oriented Programming",
                  "CS1003: Programming with Data",
                  "CS1005: Computer Science in Everyday Life",
                  "CS1006: Programming Projects",
                  "MT1002: Mathematics",
                  "MT1003: Pure and Applied Mathematics",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
            ]}
          />
        );
        break;
      case "Fourth year in University of St Andrews":
        details = (
          <TimelineDetail
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                title: "Co-found the company: Bonoware",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS1002: Object-Oriented Programming",
                  "CS1003: Programming with Data",
                  "CS1005: Computer Science in Everyday Life",
                  "CS1006: Programming Projects",
                  "MT1002: Mathematics",
                  "MT1003: Pure and Applied Mathematics",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
            ]}
          />
        );
        break;
      case "Graduate Unviersity of St Andrews":
        details = (
          <TimelineDetail
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                title: "Co-found the company: Bonoware",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS1002: Object-Oriented Programming",
                  "CS1003: Programming with Data",
                  "CS1005: Computer Science in Everyday Life",
                  "CS1006: Programming Projects",
                  "MT1002: Mathematics",
                  "MT1003: Pure and Applied Mathematics",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
            ]}
          />
        );
        break;
      case "Contract ends for Mercedes Benz":
        details = (
          <TimelineDetail
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                title: "Co-found the company: Bonoware",
                period: "September 2017 - June 2018",
                paragraph:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS1002: Object-Oriented Programming",
                  "CS1003: Programming with Data",
                  "CS1005: Computer Science in Everyday Life",
                  "CS1006: Programming Projects",
                  "MT1002: Mathematics",
                  "MT1003: Pure and Applied Mathematics",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Java",
                  "React",
                  "Javascript",
                  "HTML",
                  "CSS",
                  "AWS S3",
                  "Version Controlling: Git, Mercurial",
                ],
              },
            ]}
          />
        );
        break;
      default:
        break;
    }

    this.setState({
      timelineTitle: contentsTitle,
      timelineDetails: details,
    });
  };

  skillsDetailHandler = (contentsNo) => {
    if (this.state.thirdContentStyles === styles.detailsContainerMoved) {
      return;
    }

    switch (contentsNo) {
      case 1:
        this.setState({
          skillsTitle: "React",
          skills1: styles.skills1Focused,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 2:
        this.setState({
          skillsTitle: "Java",
          skills1: styles.skills1,
          skills2: styles.skillsLeftFocused,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 3:
        this.setState({
          skillsTitle: "Javascript",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skillsLeftFocused,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 4:
        this.setState({
          skillsTitle: "MariaDB",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skillsLeftFocused,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 5:
        this.setState({
          skillsTitle: "Git",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skillsRightFocused,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 6:
        this.setState({
          skillsTitle: "Spring",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skillsRightBelowFocused,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
      case 7:
        this.setState({
          skillsTitle: "Node.js",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skillsRightBelowFocused,
          skills8: styles.skills8,
        });
        break;
      case 8:
        this.setState({
          skillsTitle: "Processing4",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skillsRightBelowFocused,
        });
        break;
      default:
        this.setState({
          skillsTitle: "Skills",
          skills1: styles.skills1,
          skills2: styles.skills2,
          skills3: styles.skills3,
          skills4: styles.skills4,
          skills5: styles.skills5,
          skills6: styles.skills6,
          skills7: styles.skills7,
          skills8: styles.skills8,
        });
        break;
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={this.state.firstContentStyles}>
          <div className={styles.top}>
            <div className={styles.logoContainer}>
              <img alt="logo" className={styles.logo} src={logo} />
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.name}>WANKYU LIM </div>
              <div className={styles.job}>SOFTWARE ENGINEER</div>
            </div>
            <div className={styles.personalInfo}>
              <div className={styles.personalInfoContact}>CONTACT ME</div>
              <div className={styles.personalInfoTextBox}>
                iwg6852@gmail.com
              </div>
              <div className={styles.personalInfoTextBox}>linked.in/wl39</div>
              <div className={styles.personalInfoTextBox}>+44 7707 903700</div>
            </div>
          </div>
          <Slider
            images={[image1, image2, image3, image4, image5, image6]}
            height="calc(100% - 242px)"
            time={4000}
          />
        </div>
        <div className={this.state.secondContentStyles}>
          <div
            className={
              this.state.secondActive ? styles.curtainOpen : styles.curtainClose
            }
          />
          <div className={styles.title}>{this.state.timelineTitle}</div>
          <div
            className={
              this.state.timelineTitle === "Timeline"
                ? styles.timelineDefault
                : styles.timelineFocused
            }
          >
            <div className={styles.timelineImageContainer}>
              {/* <Slider
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
              /> */}
            </div>
            <div className={styles.timelineDetailContainer}>
              {this.state.timelineDetails}
            </div>
          </div>
          <div className={styles.timeline}>
            <div className={this.state.timelineStyles} />
            <div className={styles.timelineGrid}>
              <div
                className={styles.timelineCircle1}
                onClick={() =>
                  this.timelineDetailHandler(
                    "First year in University of St Andrews"
                  )
                }
              >
                <CircleAnimation delay="0s" active={this.state.secondActive} />
                <div className={styles.timelineInnerCircle1} />
                <div className={this.state.timelineBorder1} />
                <div className={this.state.timelineDetails1}>
                  First year in University of St Andrews
                </div>
              </div>
              <div
                className={styles.timelineCircle2}
                onClick={() =>
                  this.timelineDetailHandler(
                    "Second year in University of St Andrews"
                  )
                }
              >
                <CircleAnimation delay="2s" active={this.state.secondActive} />
                {/* <div className={styles.timelineInnerCircle2} /> */}
                <div className={this.state.timelineBorder2} />
                <div className={this.state.timelineDetails2}>
                  Second year in University of St Andrews
                </div>
              </div>
              <div
                className={styles.timelineCircle3}
                onClick={() =>
                  this.timelineDetailHandler("Served for National Duty")
                }
              >
                <CircleAnimation delay="4s" active={this.state.secondActive} />
                <div className={styles.timelineInnerCircle3} />
                <div className={this.state.timelineBorder3} />
                <div className={this.state.timelineDetails3}>
                  Served for National Duty
                </div>
              </div>
              <div
                className={styles.timelineCircle4}
                onClick={() =>
                  this.timelineDetailHandler(
                    "Third year in University of St Andrews"
                  )
                }
              >
                <CircleAnimation delay="7s" active={this.state.secondActive} />
                <div className={styles.timelineInnerCircle4} />
                <div className={this.state.timelineBorder4} />
                <div className={this.state.timelineDetails4}>
                  Start Freelance Tutoring as a Job
                </div>
                <div className={this.state.timelineDetails4Bottom}>
                  Third year in University of St Andrews
                </div>
              </div>
              <div
                className={styles.timelineCircle5}
                onClick={() =>
                  this.timelineDetailHandler(
                    "Fourth year in University of St Andrews"
                  )
                }
              >
                <CircleAnimation delay="9s" active={this.state.secondActive} />
                <div className={styles.timelineInnerCircle5} />
                <div className={this.state.timelineBorder5} />
                <div className={this.state.timelineDetails5}>
                  Fourth year in University of St Andrews
                </div>
              </div>
              <div
                className={styles.timelineCircle6}
                onClick={() =>
                  this.timelineDetailHandler(
                    "Graduate Unviersity of St Andrews"
                  )
                }
              >
                <CircleAnimation delay="11s" active={this.state.secondActive} />
                <div className={this.state.timelineBorder6}>
                  <div className={this.state.timelineBorder6Helper} />
                </div>
                <div className={this.state.timelineDetails6}>
                  Graduate Unviersity of St Andrews
                </div>
                <div className={this.state.timelineDetails6Bottom}>
                  Work for Mercedes Benz Korea
                </div>
              </div>
              <div
                className={styles.timelineCircle7}
                onClick={() =>
                  this.timelineDetailHandler("Contract ends for Mercedes Benz")
                }
              >
                <CircleAnimation
                  delay="11.5s"
                  active={this.state.secondActive}
                />
                <div className={this.state.timelineBorder7}>
                  <div className={this.state.timelineBorder7Helper} />
                </div>
                <div className={this.state.timelineDetails7}>
                  Contract ends for Mercedes Benz
                </div>
              </div>
            </div>
            <div className={styles.presentFlag}>
              <div className={styles.flagTriangle} />
            </div>
          </div>
        </div>
        <div className={this.state.thirdContentStyles}>
          <div
            onClick={() => this.skillsDetailHandler(0)}
            className={styles.title}
          >
            <div
              className={
                this.state.skillsTitle === "Skills"
                  ? styles.skillTitle
                  : styles.skillTitleClicked
              }
            >
              {this.state.skillsTitle}
            </div>
            <div
              className={
                this.state.skillsTitle === "Skills"
                  ? styles.hideDeco
                  : styles.deco
              }
            />
          </div>

          <div className={styles.skillsContainer}>
            <div
              className={this.state.skills1}
              onClick={() => this.skillsDetailHandler(1)}
            >
              <div className={styles.skillsTitle}>React</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "React"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="calc(100% - 242px)"
                time={4000}
              />
            </div>
            <div
              className={this.state.skills2}
              onClick={() => this.skillsDetailHandler(2)}
            >
              <div className={styles.skillsTitle}>Java</div>
            </div>
            <div
              className={this.state.skills3}
              onClick={() => this.skillsDetailHandler(3)}
            >
              <div className={styles.skillsTitle}>Javascript</div>
            </div>
            <div
              className={this.state.skills4}
              onClick={() => this.skillsDetailHandler(4)}
            >
              <div className={styles.skillsTitle}>MariaDB</div>
            </div>
            <div
              className={this.state.skills5}
              onClick={() => this.skillsDetailHandler(5)}
            >
              <div className={styles.skillsTitle}>Git</div>
            </div>
            <div
              className={this.state.skills6}
              onClick={() => this.skillsDetailHandler(6)}
            >
              <div className={styles.skillsTitle}>Spring</div>
            </div>
            <div
              className={this.state.skills7}
              onClick={() => this.skillsDetailHandler(7)}
            >
              <div className={styles.skillsTitle}>Node.js</div>
            </div>
            <div
              className={this.state.skills8}
              onClick={() => this.skillsDetailHandler(8)}
            >
              <div className={styles.skillsTitle}>Processing4</div>
            </div>
          </div>
        </div>
        <div id="firstContent" className={styles.bar} />
        <div id="secondContent" className={styles.bar} />
        <div id="thirdContent" className={styles.bar} />

        <div />
      </div>
    );
  }
}

export default MainPage;
