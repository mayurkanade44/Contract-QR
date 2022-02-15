import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddCard, Navbar } from "./components";
import {
  Home,
  SingleContract,
  SingleCard,
  CreateContract,
  NotFound,
  Register,
  Login,
  ProtectedRoute,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register></Register>} />
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateContract />
            </ProtectedRoute>
          }
        />
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
