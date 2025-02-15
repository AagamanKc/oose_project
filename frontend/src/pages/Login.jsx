import React, { useState, useEffect } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Ensure Axios is configured
import LoadingIndicator from "../components/loadingindicator";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tokenReceived, setTokenReceived] = useState(false); // New state to track token reception
  const navigate = useNavigate();

  // useEffect runs only when tokenReceived state changes
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (tokenReceived && token) { // Check for token after it's received
      console.log("Token found, redirecting to home...");
      navigate("/"); // Redirect to home if token exists
    }
  }, [tokenReceived, navigate]); // Dependency array includes tokenReceived state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setMessage(""); // Reset message before submitting

    console.log("Form Data:", formData); // Log the form data

    try {
      const res = await api.post("/users/login/", formData); // Adjust the endpoint as needed
      console.log("Login success:", res.data);

      // Save tokens to local storage
      localStorage.setItem("ACCESS_TOKEN", res.data.access_token); // Use correct key
      localStorage.setItem("REFRESH_TOKEN", res.data.refresh_token); // Use correct key

      setMessage("Login successful!");
      console.log("navigating");

      // Set tokenReceived to true after token is saved
      setTokenReceived(true);
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="background">
    <div className="wrapper">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

        {/* Remember Me and Forgot Password */}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        {/* Display message */}
        {message && <div className="message">{message}</div>}

        {/* Loading indicator */}
        {loading && <LoadingIndicator />}

        {/* Submit Button */}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Redirect to Register page */}
        <div className="login-register">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
    </>
    
  );
};

export default Login;
