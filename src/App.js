import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPages/MainPage';
import MainPagePrev from './pages/MainPrevious/MainPagePrev';
import LoginPage from './pages/User/LoginPage';
import WallPage from './pages/Sandbox/WallPage';
import StopwatchPage from './pages/Stopwatch/StopwatchPage';
import SpinnerWheelPage from './pages/Sandbox/SpinnerWheelPage';
import SandBoxPage from './pages/Sandbox/SandBoxPage';
import TutoringPage from './pages/HomeworkManagementSystem/TutoringPage';
import UploadPage from './pages/HomeworkManagementSystem/UploadPage';
import SubmissionPage from './pages/HomeworkManagementSystem/SubmissionPage';
import TutoringArchivePage from './pages/HomeworkManagementSystem/TutoringArchivePage';
import TeacherPage from './pages/HomeworkManagementSystem/TeacherPage';
import MarkingPage from './pages/HomeworkManagementSystem/MarkingPage';
import ReviewPage from './pages/HomeworkManagementSystem/ReviewPage';
import MathSolveMainPage from './pages/TimedQuestion/MathSolveMainPage';
import MathSolvePage from './pages/TimedQuestion/MathSolvePage';
import UploadMultiplePage from './pages/HomeworkManagementSystem/UploadMultiplePage';
import Pageable from './layouts/Pageable/Pageable';
import MathSolveResultPage from './pages/TimedQuestion/MathSolveResultPage';
import SignUpPage from './pages/User/SignUpPage';
import StudentPage from './pages/HomeworkManagementSystem/StudentPage';
import ModifyQuestionPage from './pages/HomeworkManagementSystem/ModifyQuestionPage';

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
            <Pageable key={'archive'} sortTypes={[]} sortParams={[]}>
              <TutoringArchivePage />
            </Pageable>
          }
        />
        <Route path="/review/:studentsName" element={<ReviewPage />} />
        <Route
          path="/submission/:studentsName"
          element={
            <Pageable
              key={'submission'}
              sortTypes={['desc']}
              sortParams={['question.generatedDate']}
            >
              <SubmissionPage />
            </Pageable>
          }
        />
        <Route
          path="/tutoring/:studentsName"
          element={
            <Pageable key={'tutoring'} sortTypes={[]} sortParams={[]}>
              <TutoringPage />
            </Pageable>
          }
        />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/marking/:studentName" element={<MarkingPage />} />
        <Route path="/user" element={<StudentPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/upload/multiples" element={<UploadMultiplePage />} />
        <Route path="/math" element={<MathSolveMainPage />} />
        <Route path="/math/start" element={<MathSolvePage />} />
        <Route
          path="/math/result/:studentName"
          element={
            <Pageable key={'math.result'} sortTypes={[]} sortParams={[]}>
              <MathSolveResultPage />
            </Pageable>
          }
        />
        <Route
          path="/questions/modify"
          element={
            <Pageable key={'questions.modify'} sortTypes={[]} sortParams={[]}>
              <ModifyQuestionPage />
            </Pageable>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
