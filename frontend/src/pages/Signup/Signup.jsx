import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
function Signup() {
    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

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
            <button>Register</button>
            <Link to="/login">Already have an account?</Link>
        </div>
    </div>
  )
}

export default Signup;
