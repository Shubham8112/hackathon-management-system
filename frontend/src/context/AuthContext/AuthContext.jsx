import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token: receivedToken, user: receivedUser } = response.data;
      
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(receivedUser));
      
      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Invalid credentials, please try again."
      };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });
      return {
        success: true,
        message: response.data.message || "Registration successful!"
      };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Try again."
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isOrganizer: user?.role === "organizer",
    isParticipant: user?.role === "participant",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
