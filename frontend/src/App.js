import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddCard, Navbar, Dashboard } from "./components";
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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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
        <Route
          path="/addcard/:id"
          element={
            <ProtectedRoute>
              <AddCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contract/:id"
          element={
            <ProtectedRoute>
              <SingleContract />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service/:id"
          element={
            <ProtectedRoute>
              <SingleCard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </Router>
  );
}

export default App;
