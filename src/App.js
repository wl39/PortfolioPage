import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainPagePrev from "./pages/MainPagePrev";
import LoginPage from "./pages/LoginPage";
import WallPage from "./pages/WallPage";
import StopwatchPage from "./pages/StopwatchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/prev" element={<MainPagePrev />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stopwatch" element={<StopwatchPage />} />
        <Route path="/wall" element={<WallPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
