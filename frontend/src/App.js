import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SingleContract, SingleCard, CreateContract } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/create" element={<CreateContract></CreateContract>} />
        <Route
          path="/contract/:id"
          element={<SingleContract></SingleContract>}
        />
        <Route path="/service/:id" element={<SingleCard></SingleCard>} />
      </Routes>
    </Router>
  );
}

export default App;
