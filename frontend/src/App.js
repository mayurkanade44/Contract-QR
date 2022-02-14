import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddCard } from "./components";
import {
  Home,
  SingleContract,
  SingleCard,
  CreateContract,
  NotFound,
  Register,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register></Register>} />
        <Route path="/" element={<Home></Home>} />
        <Route path="/create" element={<CreateContract></CreateContract>} />
        <Route path="/addcard/:id" element={<AddCard></AddCard>} />
        <Route
          path="/contract/:id"
          element={<SingleContract></SingleContract>}
        />
        <Route path="/service/:id" element={<SingleCard></SingleCard>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </Router>
  );
}

export default App;
