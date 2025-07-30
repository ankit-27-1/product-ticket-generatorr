import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/signin.css";

const AlertModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
      </div>
    </div>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("user");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSignIn = () => {
    const user = {
      email,
      password,
      userType,
    };
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post("/api/user/signin", user)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);

        if (userType === "user") {
          navigate(`/userpage/${user._id}`);
        } else if (userType === "employee") {
          navigate(`/employeepage/${user._id}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setAlertMessage("User  not found");
        } else if (error.response && error.response.status === 401) {
          setAlertMessage("Incorrect credentials");
        } else {
          setAlertMessage("An unexpected error occurred. Please try again.");
          console.error("Error signing in", error);
        }
      });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="signin-page">
      <div className="signin-image-container">
        <img
          src="https://res.cloudinary.com/dkpm0glt6/image/upload/v1735384751/Growth_strategy_solving_problem_to_success_in_work_solution_or_growing_business_concept__yawgmq.jpg"
          alt="Growth strategy"
          className="signin-image"
        />
      </div>
      <div className="signin-content">
        <h1 className="platform-title">Product Support Platform</h1>
        <h2 className="signin-title">Log in to your account</h2>
        <p className="signup-prompt">
          Don't have an account?{" "}
          <span className="signup-link" onClick={handleSignUp}>
            Sign Up
          </span>
        </p>
        <form className="signin-form">
          <div className="signin-formGroup">
            <label className="signin-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signin-input"
            />
          </div>
          <div className="signin-formGroup password-input-container">
            <label className="signin-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="signin-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          <div className="signin-formGroup">
            <label className=" signin-label">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="signin-select"
            >
              <option value="user">User </option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="buttons">
            <button type="button" onClick={handleSignIn} className="button">
              Login
            </button>
            <button type="button" onClick={handleGoBack} className="button">
              Go Back
            </button>
          </div>
        </form>
      </div>
      <AlertModal message={alertMessage} onClose={() => setAlertMessage("")} />
    </div>
  );
};

export default SignIn;
