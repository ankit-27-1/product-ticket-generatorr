import React from "react";
import { Link } from "react-router-dom";
import "../styling/homepage.css";

const Homepage = () => {
  return (
    <div className="main-container">
      <header className="hero-section">
        <div className="hero-left">
          <h1 className="hero-title">
            Welcome to the Product Support Platform
          </h1>
          <p className="hero-description">
            Simplify your support needs with our platform. Whether you're a user
            or an employee, we provide the tools to help you connect, resolve
            issues, and get the support you need.
          </p>
          <img
            src="https://res.cloudinary.com/dkpm0glt6/image/upload/v1735365050/Free_Vector___Flat_design_illustration_customer_support_shac43.jpg"
            alt="Support Illustration"
            className="hero-image"
          />
        </div>
        <div className="hero-right">
          <h2 className="hero-action-title">Get Started</h2>
          <div className="button-container">
            <Link to="/signin" className="main-button">
              Sign In
            </Link>
            <Link to="/signup" className="main-button">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <section className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Seamless Sign In & Ticket Management</h3>
            <p>
              Users and employees can easily sign in or sign up to manage their
              profiles and raise or resolve tickets related to products like
              iPhones, iPads, or iWatches.
            </p>
          </div>
          <div className="feature-item">
            <h3>Intelligent Ticket Assignment</h3>
            <p>
              Our system ensures tickets are assigned to the most suitable
              employee based on their expertise and availability, helping
              resolve issues faster.
            </p>
          </div>
          <div className="feature-item">
            <h3>Collaborative Q&A and Feedback</h3>
            <p>
              Employees can ask product-related questions, and users can provide
              feedback asynchronously, ensuring effective communication at their
              convenience.
            </p>
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <p>© 2024 Product Support Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
