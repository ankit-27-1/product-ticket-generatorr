import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../styling/viewemployeetickets.css";

const ViewEmployeeTickets = () => {
  const { userId } = useParams();
  const [employeeTickets, setEmployeeTickets] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .get(`/api/employee/${userId}/tickets`)
      .then((response) => {
        setEmployeeTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee tickets", error);
      });
  }, [userId]);

  return (
    <div className="fullscreen-background">
      <div className="employee-tickets-container">
        <h2 className="employee-tickets-title">Your Assigned Tickets</h2>
        <ul className="ticket-list">
          {employeeTickets.map((ticket) => (
            <li key={ticket._id} className="ticket-item">
              <p>Description: {ticket.description}</p>
              <p>Status: {ticket.currentstatus}</p>
              <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
              <Link
                to={`/employeepage/${userId}/view-tickets/${ticket._id}/details`}
                className="link"
              >
                <button className="view-details-button">View Details</button>
              </Link>
            </li>
          ))}
        </ul>
        <Link to={`/employeepage/${userId}`} className="go-back-button">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ViewEmployeeTickets;
