import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileUpdate from "./profileUpdate";
import "../styling/userdash.css";

const UserDash = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchLatestUpdates = async () => {
    try {
      const response = await axios.get(
        `https://ticket-support-system-backend-elxz.onrender.com/api/tickets/user/${userId}`
      );
      const tickets = response.data;

      const updates = tickets
        .flatMap((ticket) => [
          ...ticket.notes.map((note) => ({
            content: note.content,
            createdAt: note.createdAt,
            type: "Note",
          })),
          ...ticket.feedbacks.map((feedback) => ({
            content: feedback.content,
            createdAt: feedback.createdAt,
            type: "Feedback",
          })),
        ])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setLatestUpdates(updates.slice(0, 3));
    } catch (error) {
      console.error("Error fetching latest updates", error);
    }
  };

  useEffect(() => {
    fetchLatestUpdates();
  }, [userId]);

  return (
    <div className="userdash-container">
      <div className="userdash-content">
        <h2 className="userdash-title">Welcome to the User Page</h2>
        <p className="userdash-description">
          Here you can create tickets, view your tickets, and update your
          profile details.
        </p>
        <div className="userdash-buttons">
          <Link
            to={`/userpage/${userId}/create-ticket`}
            className="userdash-button"
          >
            Create Ticket
          </Link>
          <Link
            to={`/userpage/${userId}/view-tickets`}
            className="userdash-button"
          >
            View My Tickets
          </Link>
          <button
            className="userdash-button"
            onClick={() => setShowProfileUpdate(!showProfileUpdate)}
          >
            {showProfileUpdate ? "Hide Profile Update" : "Update Profile"}
          </button>
        </div>
        {showProfileUpdate && (
          <ProfileUpdate
            userId={userId}
            onProfileUpdated={fetchLatestUpdates}
          />
        )}
        <button className="userdash-signout" onClick={handleSignOut}>
          Sign Out
        </button>
        <div className="latest-updates">
          <h3>Latest Ticket Updates</h3>
          {latestUpdates.length > 0 ? (
            <ul>
              {latestUpdates.map((update, index) => (
                <li key={index}>
                  <strong>{update.type}:</strong> {update.content}{" "}
                  <em>({new Date(update.createdAt).toLocaleString()})</em>
                </li>
              ))}
            </ul>
          ) : (
            <p>No updates available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
