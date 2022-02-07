import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SingleContract } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route
          path="/contract/:id"
          element={<SingleContract></SingleContract>}
        />
      </Routes>
    </Router>
  );
}

export default App;
