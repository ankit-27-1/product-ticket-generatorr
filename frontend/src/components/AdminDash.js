import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styling/admindash.css";

const AdminDash = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admindash-container">
      <div className="admindash-content">
        <h2 className="admindash-title">Admin Dashboard</h2>
        <div className="admindash-buttons">
          <Link
            to={`/employeepage/${userId}/view-tickets`}
            className="admindash-button"
          >
            View Tickets
          </Link>
          <button className="admindash-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
