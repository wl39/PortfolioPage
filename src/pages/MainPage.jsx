import React from "react";
import styles from "./MainPage.module.css";
import logo from "../assets/logo512.png";
import Slider from "../components/Slider/Slider";

import image0 from "../images/under_construction.png";

import image1 from "../images/1651807930774_Original-modified.jpg";
import image2 from "../images/1645053171211_Original-modified.jpg";
import image3 from "../images/1600685054178_Original-modified.jpg";
import image4 from "../images/20191018_2120280_Original-modified.jpg";
import image5 from "../images/IMG_1339-modified.JPG";
import image6 from "../images/IMG_2131-modified.JPG";

import first1 from "../images/firstYear/First_Year_1.jpg";
import first2 from "../images/firstYear/First_Year_2.jpg";
import first3 from "../images/firstYear/First_Year_3.jpg";
import first4 from "../images/firstYear/First_Year_4.jpg";
import first5 from "../images/firstYear/First_Year_5.jpg";
import first6 from "../images/firstYear/First_Year_6.jpg";
import first7 from "../images/firstYear/First_Year_7.jpg";
import first9 from "../images/firstYear/First_Year_9.jpg";
import first11 from "../images/firstYear/First_Year_11.jpg";
import bono1 from "../images/firstYear/Bonoware_1.jpg";
import bono2 from "../images/firstYear/Bonoware_2.jpg";
import bono3 from "../images/firstYear/Bonoware_3.jpg";
import bono4 from "../images/firstYear/Bonoware_4.jpg";
import bono5 from "../images/firstYear/Bonoware_5.jpg";
import bono6 from "../images/firstYear/Bonoware_6.jpg";
import bono7 from "../images/firstYear/Bonoware_7.jpg";

import second1 from "../images/secondYear/Second_Year_1.jpg";
import second2 from "../images/secondYear/Second_Year_2.jpg";
import second3 from "../images/secondYear/Second_Year_3.jpg";
import second4 from "../images/secondYear/Second_Year_4.jpg";
import second5 from "../images/secondYear/Second_Year_5.jpg";
import second6 from "../images/secondYear/Second_Year_6.jpg";
import second7 from "../images/secondYear/Second_Year_7.jpg";
import second8 from "../images/secondYear/Second_Year_8.jpg";
import second9 from "../images/secondYear/Second_Year_9.jpg";
import second10 from "../images/secondYear/Second_Year_10.jpg";
import second11 from "../images/secondYear/Second_Year_11.jpg";
import second12 from "../images/secondYear/Second_Year_12.jpg";
import second13 from "../images/secondYear/Second_Year_13.jpg";
import second14 from "../images/secondYear/Second_Year_14.jpg";
import second15 from "../images/secondYear/Second_Year_15.gif";
import second16 from "../images/secondYear/Second_Year_16.gif";
import s_bono1 from "../images/secondYear/Bonoware_1.jpg";
import s_bono2 from "../images/secondYear/Bonoware_2.png";
import s_bono3 from "../images/secondYear/Bonoware_3.png";
import s_bono4 from "../images/secondYear/Bonoware_4.jpg";
import s_bono5 from "../images/secondYear/Bonoware_5.jpg";
import s_bono6 from "../images/secondYear/Bonoware_6.gif";

import holiday1 from "../images/army/holiday_1.jpg";
import holiday2 from "../images/army/holiday_2.jpg";
import holiday3 from "../images/army/holiday_3.jpg";
import army1 from "../images/army/army_1.jpg";
import army2 from "../images/army/army_2.jpg";
import army3 from "../images/army/army_3.jpg";
import army4 from "../images/army/army_4.jpg";
import army5 from "../images/army/army_5.jpg";
import army6 from "../images/army/army_6.jpg";
import army7 from "../images/army/army_7.jpg";
import army8 from "../images/army/army_8.jpg";
import army9 from "../images/army/army_9.jpg";
import army10 from "../images/army/army_10.jpg";
import army11 from "../images/army/army_11.jpg";
import army12 from "../images/army/army_12.jpg";
import army13 from "../images/army/army_13.jpg";
import army14 from "../images/army/army_14.jpg";

import third1 from "../images/thirdYear/third_1.jpg";
import third2 from "../images/thirdYear/third_2.jpg";
import third3 from "../images/thirdYear/third_3.jpg";
import third4 from "../images/thirdYear/third_4.jpg";
import third5 from "../images/thirdYear/third_5.jpg";
import third6 from "../images/thirdYear/third_6.gif";
import third7 from "../images/thirdYear/third_7.jpg";
import third8 from "../images/thirdYear/third_8.jpg";
import third9 from "../images/thirdYear/third_9.jpg";
import third10 from "../images/thirdYear/third_10.jpg";
import third11 from "../images/thirdYear/third_11.jpg";
import third12 from "../images/thirdYear/third_12.jpg";
import third13 from "../images/thirdYear/third_13.gif";

import fourth1 from "../images/fourthYear/fourth_1.jpg";
import fourth2 from "../images/fourthYear/fourth_2.jpg";
import fourth3 from "../images/fourthYear/fourth_3.jpg";
import fourth4 from "../images/fourthYear/fourth_4.jpg";
import fourth5 from "../images/fourthYear/fourth_5.jpg";
import fourth6 from "../images/fourthYear/fourth_6.jpg";

import graduate1 from "../images/graduate/graduate_1.gif";
import graduate2 from "../images/graduate/graduate_2.jpg";
import graduate3 from "../images/graduate/graduate_3.JPG";
import graduate4 from "../images/graduate/graduate_4.JPG";
import graduate5 from "../images/graduate/graduate_5.jpg";
import graduate6 from "../images/graduate/graduate_6.jpg";
import graduate7 from "../images/graduate/graduate_7.JPG";
import graduate8 from "../images/graduate/graduate_8.jpg";
import graduate9 from "../images/graduate/graduate_9.jpg";
import graduate10 from "../images/graduate/graduate_10.jpg";

import present1 from "../images/present/present_1.jpg";
import present2 from "../images/present/present_2.jpg";
import present3 from "../images/present/present_3.jpg";
import present4 from "../images/present/present_4.JPG";
import present5 from "../images/present/present_5.JPG";
import present6 from "../images/present/present_6.JPG";
import present7 from "../images/present/present_7.JPG";
import present8 from "../images/present/present_8.JPG";
import present9 from "../images/present/present_9.jpg";
import present10 from "../images/present/present_10.JPG";
import present11 from "../images/present/present_11.JPG";
import present12 from "../images/present/present_12.jpeg";

import CircleAnimation from "../components/CircleAnimation/CircleAnimation";
import TimelineDetail from "../components/TimelineDetail/TimelineDetail";
import SkillDetail from "../components/SkillDetail/SkillDetail";

import java from "../assets/logo/Java-icon.svg";
import javascript from "../assets/logo/Javascript-icon.svg";
import react from "../assets/logo/React-icon.svg";
import mariaDB from "../assets/logo/MariaDB-icon.svg";
import git from "../assets/logo/Git-icon.svg";
import spring from "../assets/logo/Spring-icon.svg";
import nodejs from "../assets/logo/Node.js-icon.svg";
import processing4 from "../assets/logo/Processing-icon.svg";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      underConsturction: true,
      firstActive: false,
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
                firstActive: true,
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
                firstActive: false,
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
    let images;
    switch (contentsTitle) {
      case "First year in University of St Andrews":
        images = [
          first1,
          first2,
          first3,
          first4,
          first5,
          first6,
          first7,
          first9,
          first11,
          bono1,
          bono2,
          bono3,
          bono4,
          bono5,
          bono6,
          bono7,
        ];
        details = (
          <TimelineDetail
            tldr={[
              "Solid Foundation in Computer Science Fundamentals:Established a robust groundwork in the fundamental principles of computer science.",
              "Basic Understanding of Fundamental Database Concepts (JDBC and SQL):Developed a foundational understanding of essential database concepts, including JDBC and SQL, for proficient data management.",
              "Co-founded Bonoware, Contributing to Establishment and Growth:Played a pivotal role in the establishment and growth of Bonoware, an IT-based company, as a co-founder.",
            ]}
            details={[
              {
                title: "Freshman",
                period: "September 2017 - June 2018",
                contents: [
                  "Acheived a solid foundation in computer science fundamentals.",
                  "Learned the principles of object-oriented programming.",
                  "Developed skills in handling extensive datasets efficiently.",
                  "Proficient in fundamental database concepts including JDBC and SQL.",
                  "Cultivated collaboration, teamwork, and patience through engaging group projects.",
                  "Learned essential mathematical concepts crucial for computer science.",
                ],
              },
              {
                title: "Co-found the company: Bonoware",
                period: "June 2018 - August 2018",
                contents: [
                  "Co-founded Bonoware, an IT-based company, contributing to its establishment and growth.",
                  "Designed and developed the website 'Probe.gg,' dedicated to facilitating the trading of limited edition shoes.",
                  "Gained proficiency in building dynamic web pages using React.",
                  "Acquired foundational knowledge in AWS S3 for cloud storage.",
                  "Explored the basics of UI/UX design for an enhanced user experience.",
                  "Familiarized myself with Agile methodology for efficient project management.",
                  "Actively participated in the development of a mid-sized project, showcasing practical application of skills and teamwork.",
                ],
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
      case "Second year in University of St Andrews":
        images = [
          second1,
          second2,
          second3,
          second4,
          second5,
          second6,
          second7,
          second8,
          second9,
          second10,
          second11,
          second12,
          second13,
          second14,
          second15,
          second16,
          s_bono1,
          s_bono2,
          s_bono3,
          s_bono4,
          s_bono5,
          s_bono6,
        ];
        details = (
          <TimelineDetail
            tldr={[
              "Embraced Test Driven Development (TDD) for Robust Software Development:Adopted Test Driven Development (TDD) as a foundational practice to enhance the robustness of software development.",
              "Developed Proficiency in Various Algorithms for Code Optimization:Attained proficiency in a variety of algorithms to optimize code performance and efficiency.",
              "Explored Computer Architectures and Formal Logic:Explored the intricacies of computer architectures, including storage systems and CPU functionality, while delving into the nuanced relationship between formal logic and computer operations.",
            ]}
            details={[
              {
                title: "Sophomore",
                period: "September 2018 - June 2019",
                contents: [
                  "Embraced Test Driven Development (TDD) as a best practice for robust software development.",
                  "Mastered abstract data structures, laying a solid foundation for efficient problem-solving.",
                  "Acquired proficiency in various algorithms to optimize code performance.",
                  "Studied Finite State Machines (FSM) for modeling and solving complex problems.",
                  "Demonstrated effective collaboration skills through group projects and teamwork.",
                  "Explored computer architectures, delving into storage systems, CPU functionality, and I/O devices.",
                  "Explored the intricate relationship between formal logic and computer operations.",
                  "Gained a comprehensive understanding of computer networks and web-based computing essentials.",
                ],
              },
              {
                title: "Web site published: Probe.gg",
                period: "September 2018 - October 2019",
                contents: [
                  "Published the web page 'probe.gg' (site now closed), utilizing AWS Amplify for hosting.",
                  "Acquired foundational knowledge about serverless web applications, optimizing efficiency.",
                  "Implemented NFC tags for streamlined inspection of shoes, enhancing traceability.",
                  "Developed an automated inspection system using machine learning image recognition techniques for efficient and accurate assessment.",
                ],
              },
            ]}
            furtherInformation={[
              {
                title: "Modules took in First Year",
                contents: [
                  "CS2001: Foundations of Computation",
                  "CS2002: Computer Systems",
                  "CS2003: The Internet and the Web",
                  "CS2006: Advanced Programming Projects",
                ],
              },
              {
                title: "Learned Skills during the period",
                contents: [
                  "Haskell",
                  "Python",
                  "PHP",
                  "C",
                  "CMake",
                  "Assembly (x86-64)",
                  "Data Structures",
                  "Alogrithms",
                ],
              },
            ]}
          />
        );
        break;
      case "Served for National Duty":
        images = [
          holiday1,
          holiday2,
          holiday3,
          army1,
          army2,
          army3,
          army4,
          army5,
          army6,
          army7,
          army8,
          army9,
          army10,
          army11,
          army12,
          army13,
          army14,
        ];
        details = (
          <TimelineDetail
            tldr={[
              "Embraced Test Driven Development (TDD) for Robust Software Development:Adopted Test Driven Development (TDD) as a foundational practice to enhance the robustness of software development.",
              "Developed Proficiency in Various Algorithms for Code Optimization:Attained proficiency in a variety of algorithms to optimize code performance and efficiency.",
              "Explored Computer Architectures and Formal Logic:Explored the intricacies of computer architectures, including storage systems and CPU functionality, while delving into the nuanced relationship between formal logic and computer operations.",
            ]}
            details={[
              {
                title: "Enlisted in the Army",
                period: "November 2019 - May 2021",
                contents: [
                  "Discharged as a Sergent",
                  "Worked as a Squad Leader",
                  "Led the CBRN reconnaissance team, achieving 1st place in performance.",
                  "Made simple games such as Chess, 2048 and Tetris via Microsoft VBA.",
                  "Partecapated on variety of trainings, can withstand in extreme situation",
                ],
              },
            ]}
            furtherInformation={[
              {
                title: "Learned Skills during the period",
                contents: [
                  "Leadership",
                  "Python",
                  "PHP",
                  "C",
                  "CMake",
                  "Assembly (x86-64)",
                  "Data Structures",
                  "Alogrithms",
                ],
              },
            ]}
          />
        );
        break;
      case "Third year in University of St Andrews":
        images = [
          third1,
          third2,
          third3,
          third4,
          third5,
          third6,
          third7,
          third8,
          third9,
          third10,
          third11,
          third12,
          third13,
        ];
        details = (
          <TimelineDetail
            tldr={[
              "Embraced Test Driven Development (TDD) for Robust Software Development:Adopted Test Driven Development (TDD) as a foundational practice to enhance the robustness of software development.",
              "Developed Proficiency in Various Algorithms for Code Optimization:Attained proficiency in a variety of algorithms to optimize code performance and efficiency.",
              "Explored Computer Architectures and Formal Logic:Explored the intricacies of computer architectures, including storage systems and CPU functionality, while delving into the nuanced relationship between formal logic and computer operations.",
            ]}
            details={[
              {
                title: "Enlisted in the Army",
                period: "November 2019 - May 2021",
                contents: [
                  "Discharged as a Sergent",
                  "Worked as a Squad Leader",
                  "Led the CBRN reconnaissance team, achieving 1st place in performance.",
                  "Made simple games such as Chess, 2048 and Tetris via Microsoft VBA.",
                  "Partecapated on variety of trainings, can withstand in extreme situation",
                ],
              },
            ]}
            furtherInformation={[
              {
                title: "Learned Skills during the period",
                contents: [
                  "Leadership",
                  "Python",
                  "PHP",
                  "C",
                  "CMake",
                  "Assembly (x86-64)",
                  "Data Structures",
                  "Alogrithms",
                ],
              },
            ]}
          />
        );
        break;
      case "Fourth year in University of St Andrews":
        images = [fourth1, fourth2, fourth3, fourth4, fourth5, fourth6];
        details = (
          <TimelineDetail
            tldr={[
              "Embraced Test Driven Development (TDD) for Robust Software Development:Adopted Test Driven Development (TDD) as a foundational practice to enhance the robustness of software development.",
              "Developed Proficiency in Various Algorithms for Code Optimization:Attained proficiency in a variety of algorithms to optimize code performance and efficiency.",
              "Explored Computer Architectures and Formal Logic:Explored the intricacies of computer architectures, including storage systems and CPU functionality, while delving into the nuanced relationship between formal logic and computer operations.",
            ]}
            details={[
              {
                title: "Enlisted in the Army",
                period: "November 2019 - May 2021",
                contents: [
                  "Discharged as a Sergent",
                  "Worked as a Squad Leader",
                  "Led the CBRN reconnaissance team, achieving 1st place in performance.",
                  "Made simple games such as Chess, 2048 and Tetris via Microsoft VBA.",
                  "Partecapated on variety of trainings, can withstand in extreme situation",
                ],
              },
            ]}
            furtherInformation={[
              {
                title: "Learned Skills during the period",
                contents: [
                  "Leadership",
                  "Python",
                  "PHP",
                  "C",
                  "CMake",
                  "Assembly (x86-64)",
                  "Data Structures",
                  "Alogrithms",
                ],
              },
            ]}
          />
        );
        break;
      case "Graduate Unviersity of St Andrews":
        images = [
          graduate1,
          graduate2,
          graduate3,
          graduate4,
          graduate5,
          graduate6,
          graduate7,
          graduate8,
          graduate9,
          graduate10,
        ];
        details = (
          <TimelineDetail
            tldr={[
              "Embraced Test Driven Development (TDD) for Robust Software Development:Adopted Test Driven Development (TDD) as a foundational practice to enhance the robustness of software development.",
              "Developed Proficiency in Various Algorithms for Code Optimization:Attained proficiency in a variety of algorithms to optimize code performance and efficiency.",
              "Explored Computer Architectures and Formal Logic:Explored the intricacies of computer architectures, including storage systems and CPU functionality, while delving into the nuanced relationship between formal logic and computer operations.",
            ]}
            details={[
              {
                title: "Enlisted in the Army",
                period: "November 2019 - May 2021",
                contents: [
                  "Discharged as a Sergent",
                  "Worked as a Squad Leader",
                  "Led the CBRN reconnaissance team, achieving 1st place in performance.",
                  "Made simple games such as Chess, 2048 and Tetris via Microsoft VBA.",
                  "Partecapated on variety of trainings, can withstand in extreme situation",
                ],
              },
            ]}
            furtherInformation={[
              {
                title: "Learned Skills during the period",
                contents: [
                  "Leadership",
                  "Python",
                  "PHP",
                  "C",
                  "CMake",
                  "Assembly (x86-64)",
                  "Data Structures",
                  "Alogrithms",
                ],
              },
            ]}
          />
        );
        break;
      case "Contract ends for Mercedes Benz":
        images = [
          present1,
          present2,
          present3,
          present4,
          present5,
          present6,
          present7,
          present8,
          present9,
          present10,
          present11,
          present12,
        ];
        details = (
          <TimelineDetail
            tldr={[
              "Embraced Test Driven Development (TDD) for Robust Software Development:Adopted Test Driven Development (TDD) as a foundational practice to enhance the robustness of software development.",
              "Developed Proficiency in Various Algorithms for Code Optimization:Attained proficiency in a variety of algorithms to optimize code performance and efficiency.",
              "Explored Computer Architectures and Formal Logic:Explored the intricacies of computer architectures, including storage systems and CPU functionality, while delving into the nuanced relationship between formal logic and computer operations.",
            ]}
            details={[
              {
                title: "Enlisted in the Army",
                period: "November 2019 - May 2021",
                contents: [
                  "Discharged as a Sergent",
                  "Worked as a Squad Leader",
                  "Led the CBRN reconnaissance team, achieving 1st place in performance.",
                  "Made simple games such as Chess, 2048 and Tetris via Microsoft VBA.",
                  "Partecapated on variety of trainings, can withstand in extreme situation",
                ],
              },
            ]}
            furtherInformation={[
              {
                title: "Learned Skills during the period",
                contents: [
                  "Leadership",
                  "Python",
                  "PHP",
                  "C",
                  "CMake",
                  "Assembly (x86-64)",
                  "Data Structures",
                  "Alogrithms",
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
      timelineImages: images,
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
            isActive={this.state.firstActive}
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
              <Slider
                images={this.state.timelineImages}
                height="100%"
                time={4000}
                isActive={this.state.timelineTitle !== "Timeline"}
              />
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
                height="100%"
                time={4000}
                title="React"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={react}
              />
            </div>
            <div
              className={this.state.skills2}
              onClick={() => this.skillsDetailHandler(2)}
            >
              <div className={styles.skillsTitle}>Java</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "Java"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
                title="Java"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={java}
              />
            </div>
            <div
              className={this.state.skills3}
              onClick={() => this.skillsDetailHandler(3)}
            >
              <div className={styles.skillsTitle}>Javascript</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "Javascript"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
                title="Java"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={javascript}
              />
            </div>
            <div
              className={this.state.skills4}
              onClick={() => this.skillsDetailHandler(4)}
            >
              <div className={styles.skillsTitle}>MariaDB</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "MariaDB"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
                title="Java"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={mariaDB}
              />
            </div>
            <div
              className={this.state.skills5}
              onClick={() => this.skillsDetailHandler(5)}
            >
              <div className={styles.skillsTitle}>Git</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "Git"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
                title="Java"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={git}
              />
            </div>
            <div
              className={this.state.skills6}
              onClick={() => this.skillsDetailHandler(6)}
            >
              <div className={styles.skillsTitle}>Spring</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "Spring"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
                title="Java"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={spring}
              />
            </div>
            <div
              className={this.state.skills7}
              onClick={() => this.skillsDetailHandler(7)}
            >
              <div className={styles.skillsTitle}>Node.js</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "Node.js"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
                title="Java"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={nodejs}
              />
            </div>
            <div
              className={this.state.skills8}
              onClick={() => this.skillsDetailHandler(8)}
            >
              <div className={styles.skillsTitle}>Processing4</div>
              <SkillDetail
                isActive={this.state.skillsTitle === "Processing4"}
                images={[image1, image2, image3, image4, image5, image6]}
                height="100%"
                time={4000}
                title="Java"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum."
                logo={processing4}
              />
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
