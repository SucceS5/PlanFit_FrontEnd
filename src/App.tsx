// ✅ App.tsx는 아래처럼 깔끔하게 유지하세요

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import CreateCourse from "./pages/CreateCourse";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
      </Routes>
    </Router>
  );
}
