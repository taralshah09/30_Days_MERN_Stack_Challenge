import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
        axios
        .post(
          'http://localhost:3000/users/login',
          { email, password },
          { withCredentials: true } // Important for sending cookies
        )
        .then((res) => {
          console.log('Login successful:', res.data);
          navigate("/")
        })
        .catch((err) => {
          console.log('Error logging in:', err.response?.data || err.message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
