# Portfolio Website

This repository contains my personal portfolio website built with React. It’s not just a showcase of my career and skills—it’s also a demonstration of my ability to build complex, interactive web applications. The website is divided into three main sections:

1. **Main Page (`/`)**  
   The landing page features my professional background, career highlights, skills, and other relevant information to provide a quick overview of my experience.

2. **Homework Management System (HMS)**  
   A full-fledged educational platform that includes several modules to help students and teachers interact with practice problems:

   - **[Question](https://91b.co.uk/questions)**: A central hub for all practice problem sets.
   - **[Review](https://91b.co.uk/review/wl39)**: Allows students to revisit and review problems they previously answered incorrectly.
   - **[Tutoring](https://91b.co.uk/tutoring/wl39)**: An interactive module where students can solve problems with guided help.
   - **[Teacher](https://91b.co.uk/teacher)**: A dashboard for teachers to monitor student progress, check submitted assignments, and track pending grading tasks.
   - **Marking**: Dedicated for descriptive (essay-style) questions where teachers can set the correct answers.
   - **[Upload](https://91b.co.uk/upload)**: A page for uploading new problems into the system.
   - **[Math](https://91b.co.uk/math)**: A simple math problem-solving module designed for quick exercises.

3. **[Stopwatch](https://91b.co.uk/stopwatch) (`/stopwatch`)**  
   A lightweight toy project designed to help track study time, ensuring efficient time management during study sessions.

> You can check this web application on [here](https://91b.co.uk)

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)

---

## Overview

The website serves two primary purposes:

- **Professional Showcase:** The main page details my work experience, skills, and career achievements.
- **Interactive Demonstrations:** The HMS and Stopwatch modules illustrate my ability to build dynamic, interactive web applications that cater to both educational and utility purposes.

Each module is carefully designed with user experience in mind, from intuitive navigation to responsive design across different devices.

---

## Project Structure

Below is the complete directory structure for the project:

```
/portfolio-website
├── /public                     # Publicly available static assets
├── /src                        # Source files for the React application
│   ├── App.js                  # Main application file (includes routing)
│   ├── index.js                # Application entry point
│   ├── reportWebVitals.js      # Performance metrics setup
│   ├── /components             # Reusable UI components
│   │   ├── Calendar/
│   │   ├── Dropdown/
│   │   ├── Snackbar/
│   │   ├── UploadForm/
│   │   ├── Timeline/
│   │   ├── Header/
│   │   ├── CustomButton/
│   │   └── (other UI components...)
│   ├── /pages                  # Pages of the website
│   │   ├── /MainPages          # Portfolio main page
│   │   │   ├── MainPage.jsx
│   │   │   ├── MainPage.module.css
│   │   │   └── components/     # Subcomponents for the Main Page (e.g., Skills, TimelinePage)
│   │   ├── /Stopwatch          # Stopwatch module for tracking study time
│   │   │   ├── StopwatchPage.jsx
│   │   │   └── StopwatchPage.module.css
│   │   ├── /HomeworkManagementSystem  # HMS modules for education
│   │   ├── /TimedQuestion       # Math problem-solving pages
│   │   ├── /Sandbox             # Additional experimental pages (e.g., wall, spinner wheel)
│   │   └── /worker              # Web worker scripts for Stopwatch
│   │       ├── stopwatchWorker.js
│   │       └── workerBuilder.js
│   ├── /services                # Services and API integrations
│   │   ├── /api
│   │   │   ├── HMSService.js
│   │   │   ├── StopwatchService.js
│   │   │   └── SimpleMathQuestionService.js
│   │   └── /utils
│   │       ├── axiosInstance.js   # Configured Axios instance for API calls
│   │
│   ├── /styles                  # Global CSS/SCSS files
│   └── /utils                   # General helper functions
│       └── dateFormat.js           # Utility for formatting dates
├── /data                        # Data files (e.g., list.txt, countries.txt)
├── /layouts                     # Layout components (e.g., HorizontalSplit, Pageable)
├── /fonts                       # Custom fonts (Playfair Display, DM Sans, etc.)
├── package.json                 # Project metadata and dependencies
└── README.md                    # This file
```

---

## Features

### Main Page

- Responsive layout that adapts to various devices.
- Interactive sections showcasing professional achievements and skills.
- Modern UI components for a clean, professional look.

### Homework Management System (HMS)

- **User Roles:**  
  Supports different interfaces for students and teachers.
- **Interactive Modules:**  
  Each module is designed to enhance the learning process through interactivity—whether reviewing problems, engaging in tutoring sessions, or uploading new challenges.
- **Performance Tracking:**  
  Teachers can easily monitor progress and manage grading tasks through the dedicated dashboard.

### Stopwatch

- A simple yet effective tool to help users track study time.
- Utilizes web workers for accurate and non-blocking time tracking.
- Intuitive interface designed for quick start/stop functionality.

---

## Technologies

- **React:**  
  The main framework used for building the user interface.
- **React Router:**  
  For managing multi-page navigation within the single-page application.
- **Axios:**  
  For handling API calls and managing data fetching.
- **CSS Modules:**  
  To ensure modular and scoped styling for components.
- **Web Workers:**  
  Used in the Stopwatch module for efficient background processing.
- **Custom Fonts & Assets:**  
  Custom typography from Playfair Display and DM Sans to give the site a unique visual appeal.

---

Thank you for taking the time to explore my portfolio website. If you have any questions or feedback, please feel free to reach out!

---
