import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test1 from "./pages/Test1";
import Test3 from "./pages/Test3";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/react-test" element={<Home />} />
        <Route path="/react-test/test1" element={<Test1 />} />
        <Route path="/react-test/test3" element={<Test3 />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
