import React, { useState } from "react";
import "../styles/register.css";  // Ensure the correct CSS file is used
import { Link, useNavigate } from "react-router-dom";
import api from "../api";  // Make sure you have the api instance configured
import LoadingIndicator from "../components/loadingindicator";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");  // To store success or error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? parseInt(value, 10) : value, // Convert age to integer
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setMessage("");  // Reset message before submitting

    try {
      const res = await api.post("http://127.0.0.1:8000/users/register/", formData);
      console.log("Registration success:", res.data);
      setMessage("User created successfully!");  // Success message
      navigate("/login");  // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Error during registration. Please try again.");  // Error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="background">
    <div className="wrapper">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div className="input-box">
          <input
            type="text"
            name="name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>

        {/* Age Input */}
        <div className="input-box">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <label>Age</label>
        </div>

        {/* Email Input */}
        <div className="input-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        {/* Password Input */}
        <div className="input-box">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        {/* Display message */}
        {message && <div className="message">{message}</div>}

        {/* Loading indicator */}
        {loading && <LoadingIndicator />}

        {/* Submit Button */}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Redirect to Login page for Register */}
        <div className="login-register">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default Register;
