import Signup from "./pages/Signup/Signup";
import Login from "./pages/Logintemp/Login";
import About from "./pages/about/About";
import Dashboard from "./pages/Dashboard/Dashboard";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="/About" element={<About/>}/>
      <Route path="/Dashboard"
      element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default App;