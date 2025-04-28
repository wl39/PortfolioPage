import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPages/MainPage";
import MainPagePrev from "./pages/MainPrevious/MainPagePrev";
import LoginPage from "./pages/User/LoginPage";
import WallPage from "./pages/Sandbox/WallPage";
import StopwatchPage from "./pages/Stopwatch/StopwatchPage";
import SpinnerWheelPage from "./pages/Sandbox/SpinnerWheelPage";
import SandBoxPage from "./pages/Sandbox/SandBoxPage";
import TutoringPage from "./pages/HomeworkManagementSystem/TutoringPage";
import UploadPage from "./pages/HomeworkManagementSystem/UploadPage";
import SubmissionPage from "./pages/HomeworkManagementSystem/SubmissionPage";
import TutoringArchivePage from "./pages/HomeworkManagementSystem/TutoringArchivePage";
import TeacherPage from "./pages/HomeworkManagementSystem/TeacherPage";
import MarkingPage from "./pages/HomeworkManagementSystem/MarkingPage";
import ReviewPage from "./pages/HomeworkManagementSystem/ReviewPage";
import MathSolveMainPage from "./pages/TimedQuestion/MathSolveMainPage";
import MathSolvePage from "./pages/TimedQuestion/MathSolvePage";
import UploadMultiplePage from "./pages/HomeworkManagementSystem/UploadMultiplePage";
import Pageable from "./layouts/Pageable/Pageable";
import MathSolveResultPage from "./pages/TimedQuestion/MathSolveResultPage";
import SignUpPage from "./pages/User/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/prev" element={<MainPagePrev />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/stopwatch" element={<StopwatchPage />} />
        <Route path="/wall" element={<WallPage />} />
        <Route path="/spinner" element={<SpinnerWheelPage />} />
        <Route path="/sandbox" element={<SandBoxPage />} />
        <Route
          path="/questions"
          element={
            <Pageable>
              <TutoringArchivePage />
            </Pageable>
          }
        />
        <Route path="/review/:studentsName" element={<ReviewPage />} />
        <Route
          path="/submission/:studentsName"
          element={
            <Pageable>
              <SubmissionPage />
            </Pageable>
          }
        />
        <Route
          path="/tutoring/:studentsName"
          element={
            <Pageable>
              <TutoringPage />
            </Pageable>
          }
        />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/marking/:studentName" element={<MarkingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/upload/multiples" element={<UploadMultiplePage />} />
        <Route path="/math" element={<MathSolveMainPage />} />
        <Route path="/math/start" element={<MathSolvePage />} />
        <Route
          path="/math/result/:studentName"
          element={
            <Pageable>
              <MathSolveResultPage />
            </Pageable>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
