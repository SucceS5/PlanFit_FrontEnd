import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import CreateCourse from "./pages/CreateCourse";
import { useState } from "react";
import Search from "./component/pages/Search";
import Select from "./component/pages/Select";

export default function App() {
  const [step, setStep] = useState<"search" | "select" | null>("search");

  const handleClose = () => {
    setStep(null);
  };

  const handleSearchComplete = () => {
    setStep("select");
  };

  return (
    <Router>
      <Routes>
        {/* 홈페이지 */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
      </Routes>

      {/* 상태에 따라 컴포넌트 렌더링 */}
      {step === "search" && <Search onClose={handleClose} onComplete={handleSearchComplete} />}
      {step === "select" && <Select onClose={handleClose} />}
    </Router>
  );
}
