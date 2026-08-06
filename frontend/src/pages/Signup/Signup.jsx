import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import './Signup.css';
import api from "../../services/api";

function Signup() {
    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[role, setRole] = useState("participant");
    const Navigate = useNavigate();

    const handleSignup = async() =>{
      try{
        const response = await api.post("/auth/signup",{
          name,
          email,
          password,
          role,
        });

        alert(response.data.message);
        Navigate("/login");
      }catch(error){
        alert(error.response?.data?.message || "Signup Failed");
      }
    }
  return (
    <div className='main'>
        <div className="container">
            <h3>Register</h3>
            <input type="text"
            placeholder="Enter your name"
            value = {name}
            onChange={(e) => setName(e.target.value)}
            />

            <input type="email"
            placeholder="Email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
             />

            <input type="password" 
            placeholder="Password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
             />  
            
            <select value={role} onChange={(e)=> setRole(e.target.value)}>
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
            </select>
            <button onClick={handleSignup}>Sign Up</button>

            <Link to="/login">Already have an account?</Link>

        </div>
    </div>
  )
}

export default Signup;
