import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/signup.css";

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

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [specialization, setSpecialization] = useState("iphone");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPasswordLength = 8;

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setAlertMessage("Password and Confirm Password do not match");
      return;
    }

    if (password.length < minPasswordLength) {
      setAlertMessage(
        `Password must be at least ${minPasswordLength} characters long`
      );
      return;
    }

    if (!emailRegex.test(email)) {
      setAlertMessage("Invalid email format");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
      userType,
      specialization: userType === "employee" ? specialization : "",
    };
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post("/api/user/signup", user)
      .then(() => {
        setAlertMessage("User registered successfully");
      })
      .catch(() => {
        setAlertMessage("Error registering user");
      });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="signup-page">
      <div className="signup-image-container">
        <img
          src="https://res.cloudinary.com/dkpm0glt6/image/upload/v1735384751/Growth_strategy_solving_problem_to_success_in_work_solution_or_growing_business_concept__yawgmq.jpg"
          alt="Growth strategy"
          className="signup-image"
        />
      </div>
      <div className="signup-content">
        <h1 className="platform-title">Product Support Platform</h1>
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signin-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")} className="link">
            Sign In
          </span>
        </p>
        <form className="signup-form">
          <div className="signup-formGroup">
            <label className="signup-label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="signup-input"
            />
          </div>
          <div className="signup-formGroup">
            <label className="signup-label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="signup-input"
            />
          </div>
          <div className="signup-formGroup">
            <label className="signup-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signup-input"
            />
          </div>
          <div className="signup-formGroup">
            <label className="signup-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="signup-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          <div className="signup-formGroup">
            <label className="signup-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="signup-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          <div className="signup-formGroup">
            <label className="signup-label">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="signup-select"
            >
              <option value="user">User</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {userType === "employee" && (
            <div className="signup-formGroup">
              <label className="signup-label">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="signup-select"
              >
                <option value="iphone">iPhone</option>
                <option value="iwatch">iWatch</option>
                <option value="ipad">iPad</option>
              </select>
            </div>
          )}
          <div className="buttons">
            <button type="button" onClick={handleSignUp} className="button">
              Create Account
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

export default SignUp;
