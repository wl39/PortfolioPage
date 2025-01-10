import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPages/MainPage";
import MainPagePrev from "./pages/MainPagePrev";
import LoginPage from "./pages/LoginPage";
import WallPage from "./pages/WallPage";
import StopwatchPage from "./pages/StopwatchPage";
import SpinnerWheelPage from "./pages/SpinnerWheelPage";
import SandBoxPage from "./pages/SandBoxPage";
import TutoringPage from "./pages/TutoringPage";
import UploadPage from "./pages/UploadPage";
import SubmissionPage from "./pages/SubmissionPage";
import TutoringArchivePage from "./pages/TutoringArchivePage";
import TeacherPage from "./pages/TeacherPage";
import MarkingPage from "./pages/MarkingPage";
import ReviewPage from "./pages/ReviewPage";
import MathSolveMainPage from "./pages/MathSolveMainPage";
import MathSolvePage from "./pages/MathSolvePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/prev" element={<MainPagePrev />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stopwatch" element={<StopwatchPage />} />
        <Route path="/wall" element={<WallPage />} />
        <Route path="/spinner" element={<SpinnerWheelPage />} />
        <Route path="/sandbox" element={<SandBoxPage />} />
        <Route path="/questions" element={<TutoringArchivePage />} />
        <Route path="/review/:studentsName" element={<ReviewPage />} />
        <Route path="/submission/:studentsName" element={<SubmissionPage />} />
        <Route path="/tutoring/:studentsName" element={<TutoringPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/marking/:studentName" element={<MarkingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/math" element={<MathSolveMainPage />} />
        <Route path="/math/start" element={<MathSolvePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
