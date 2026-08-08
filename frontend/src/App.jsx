import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import About from "./pages/about/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllHackathons from "./pages/AllHackathons/AllHackathons";
import MyHackathons from "./pages/MyHackathons/Myhackathons";
import Participants from "./pages/Participants/Participants";
import CreateHackathon from "./pages/CreateHackathon/CreateHackathon";
import UpdateHackathon from "./pages/UpdateHackathon/UpdateHackathon";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";


import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hackathons"
        element={
          <ProtectedRoute>
            <AllHackathons />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-hackathons"
        element={
          <ProtectedRoute>
            <MyHackathons />
          </ProtectedRoute>
        }
      />

      <Route
        path="/participants/:id"
        element={
          <ProtectedRoute>
            <Participants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-hackathon"
        element={
          <ProtectedRoute>
            <CreateHackathon />
          </ProtectedRoute>
        }
      />

      <Route
        path="/update-hackathon/:id"
        element={
          <ProtectedRoute>
            <UpdateHackathon />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;