import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () =>{
    try{
      const response = await api.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      alert("Login Successful");

      navigate("/Dashboard");
    }catch(error){
      alert(error.response?.data?.message || "login failed");
    }
  };

  return (
    <div>
      <input type="email" 
      placeholder='Enter your email' 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
      />

      <input type="password" 
      placeholder='Enter your password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;
