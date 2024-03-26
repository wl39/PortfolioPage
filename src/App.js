import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
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
        <Route path="/archive/tutoring" element={<TutoringArchivePage />} />
        <Route path="/submission/:studentsName" element={<SubmissionPage />} />
        <Route path="/tutoring/:studentsName" element={<TutoringPage />} />
        <Route path="/uploadD" element={<UploadPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
