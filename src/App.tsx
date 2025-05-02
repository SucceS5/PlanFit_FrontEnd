import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 홈페이지 */}
        <Route path="/" element={<WelcomePage />} />
        {/* 코스생성 */}
      </Routes>
    </Router>
  );
}

export default App;
