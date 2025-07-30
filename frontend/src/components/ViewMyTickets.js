import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate, Link } from "react-router-dom"; // Import Link
import "../styling/viewmytickets.css";

const UserTickets = () => {
  const { userId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .get(`/api/tickets/user/${userId}`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user's tickets", error);
      });
  }, [userId]);

  const handleViewDetails = (ticketId) => {
    setSelectedTicketId(ticketId);
  };

  return (
    <div className="fullscreen-background">
      <div className="user-tickets-container">
        <h2 className="user-tickets-title">User's Tickets</h2>
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="ticket-item">
              <h3>Product Type: {ticket.productType}</h3>
              <p>Status: {ticket.currentstatus}</p>
              <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(ticket._id)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
        {selectedTicketId && (
          <Navigate
            to={`/userpage/${userId}/view-tickets/${selectedTicketId}/details`}
          />
        )}
        <Link to={`/userpage/${userId}`} className="go-back-button">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default UserTickets;
