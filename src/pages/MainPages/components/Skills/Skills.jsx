import React, { useState } from "react";

import image1 from "../../../../images/1651807930774_Original-modified.jpg";
import image2 from "../../../../images/1645053171211_Original-modified.jpg";
import image3 from "../../../../images/1600685054178_Original-modified.jpg";
import image4 from "../../../../images/20191018_2120280_Original-modified.jpg";
import image5 from "../../../../images/IMG_1339-modified.JPG";
import image6 from "../../../../images/IMG_2131-modified.JPG";

import SkillDetail from "../../../../components/SkillDetail/SkillDetail";

import java from "../../../../assets/logo/Java-icon.svg";
import javascript from "../../../../assets/logo/Javascript-icon.svg";
import react from "../../../../assets/logo/React-icon.svg";
import mariaDB from "../../../../assets/logo/MariaDB-icon.svg";
import git from "../../../../assets/logo/Git-icon.svg";
import spring from "../../../../assets/logo/Spring-icon.svg";
import nodejs from "../../../../assets/logo/Node.js-icon.svg";
import processing4 from "../../../../assets/logo/Processing-icon.svg";

import styles from "../../MainPage.module.css";

function Skills(props) {
  const [skillTitle, setSkillTitle] = useState("Skills");
  const [skillStyles, setSkillStyles] = useState({
    0: styles.skills1,
    1: styles.skills2,
    2: styles.skills3,
    3: styles.skills4,
    4: styles.skills5,
    5: styles.skills6,
    6: styles.skills7,
    7: styles.skills8,
  });

  const skillsDetailHandler = (contentsNo) => {
    if (!props.isActive) {
      return;
    }

    switch (contentsNo) {
      case 1:
        setSkillTitle("React");
        setSkillStyles({
          0: styles.skills1Focused,
          1: styles.skills2,
          2: styles.skills3,
          3: styles.skills4,
          4: styles.skills5,
          5: styles.skills6,
          6: styles.skills7,
          7: styles.skills8,
        });
        break;
      case 2:
        setSkillTitle("Java");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skillsLeftFocused,
          2: styles.skills3,
          3: styles.skills4,
          4: styles.skills5,
          5: styles.skills6,
          6: styles.skills7,
          7: styles.skills8,
        });
        break;
      case 3:
        setSkillTitle("Javascript");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skills2,
          2: styles.skillsLeftFocused,
          3: styles.skills4,
          4: styles.skills5,
          5: styles.skills6,
          6: styles.skills7,
          7: styles.skills8,
        });
        break;
      case 4:
        setSkillTitle("MariaDB");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skills2,
          2: styles.skills3,
          3: styles.skillsLeftFocused,
          4: styles.skills5,
          5: styles.skills6,
          6: styles.skills7,
          7: styles.skills8,
        });
        break;
      case 5:
        setSkillTitle("Git");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skills2,
          2: styles.skills3,
          3: styles.skills4,
          4: styles.skillsRightFocused,
          5: styles.skills6,
          6: styles.skills7,
          7: styles.skills8,
        });
        break;
      case 6:
        setSkillTitle("Spring");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skills2,
          2: styles.skills3,
          3: styles.skills4,
          4: styles.skills5,
          5: styles.skillsRightBelowFocused,
          6: styles.skills7,
          7: styles.skills8,
        });
        break;
      case 7:
        setSkillTitle("Node.js");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skills2,
          2: styles.skills3,
          3: styles.skills4,
          4: styles.skills5,
          5: styles.skills6,
          6: styles.skillsRightBelowFocused,
          7: styles.skills8,
        });
        break;
      case 8:
        setSkillTitle("Processing4");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skills2,
          2: styles.skills3,
          3: styles.skills4,
          4: styles.skills5,
          5: styles.skills6,
          6: styles.skills7,
          7: styles.skillsRightBelowFocused,
        });
        break;
      default:
        setSkillTitle("Skills");
        setSkillStyles({
          0: styles.skills1,
          1: styles.skills2,
          2: styles.skills3,
          3: styles.skills4,
          4: styles.skills5,
          5: styles.skills6,
          6: styles.skills7,
          7: styles.skills8,
        });
        break;
    }
  };

  return (
    <div
      className={
        props.isActive ? styles.detailsContainer : styles.detailsContainerMoved
      }
    >
      <div onClick={() => skillsDetailHandler(0)} className={styles.title}>
        <div
          className={
            skillTitle === "Skills"
              ? styles.skillTitle
              : styles.skillTitleClicked
          }
        >
          {skillTitle}
        </div>
        <div
          className={skillTitle === "Skills" ? styles.hideDeco : styles.deco}
        />
      </div>

      <div className={styles.skillsContainer}>
        <div className={skillStyles[0]} onClick={() => skillsDetailHandler(1)}>
          <div className={styles.skillsTitle}>React</div>
          <SkillDetail
            isActive={skillTitle === "React"}
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
        <div className={skillStyles[1]} onClick={() => skillsDetailHandler(2)}>
          <div className={styles.skillsTitle}>Java</div>
          <SkillDetail
            isActive={skillTitle === "Java"}
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
        <div className={skillStyles[2]} onClick={() => skillsDetailHandler(3)}>
          <div className={styles.skillsTitle}>Javascript</div>
          <SkillDetail
            isActive={skillTitle === "Javascript"}
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
        <div className={skillStyles[3]} onClick={() => skillsDetailHandler(4)}>
          <div className={styles.skillsTitle}>MariaDB</div>
          <SkillDetail
            isActive={skillTitle === "MariaDB"}
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
        <div className={skillStyles[4]} onClick={() => skillsDetailHandler(5)}>
          <div className={styles.skillsTitle}>Git</div>
          <SkillDetail
            isActive={skillTitle === "Git"}
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
        <div className={skillStyles[5]} onClick={() => skillsDetailHandler(6)}>
          <div className={styles.skillsTitle}>Spring</div>
          <SkillDetail
            isActive={skillTitle === "Spring"}
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
        <div className={skillStyles[6]} onClick={() => skillsDetailHandler(7)}>
          <div className={styles.skillsTitle}>Node.js</div>
          <SkillDetail
            isActive={skillTitle === "Node.js"}
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
        <div className={skillStyles[7]} onClick={() => skillsDetailHandler(8)}>
          <div className={styles.skillsTitle}>Processing4</div>
          <SkillDetail
            isActive={skillTitle === "Processing4"}
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
  );
}

export default Skills;
