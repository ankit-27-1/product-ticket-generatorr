import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/employeeticketdetails.css";

const EmployeeTicketDetails = () => {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [feedbackContent, setFeedbackContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const api = axios.create({
          baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
        });

        const response = await api.get(`/api/tickets/${ticketId}/details`);
        const fetchedTicketDetails = response.data;

        // Only update status if the current status is not "closed"
        if (
          fetchedTicketDetails.feedbacks.length > 0 &&
          fetchedTicketDetails.currentstatus !== "closed"
        ) {
          fetchedTicketDetails.currentstatus = "in progress";

          api
            .patch(`/api/tickets/${ticketId}/update-status`, {
              newStatus: "in progress",
            })
            .then((response) => {
              console.log("Ticket status updated successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error updating ticket status", error);
            });
        }

        setTicketDetails(fetchedTicketDetails);
      } catch (error) {
        console.error("Error fetching ticket details", error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  const handleAddFeedback = () => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post(`/api/tickets/${ticketId}/add-feedback`, {
        content: feedbackContent,
      })
      .then((response) => {
        const updatedTicketDetails = response.data;
        setTicketDetails(updatedTicketDetails);
        setFeedbackContent("");

        if (
          updatedTicketDetails.feedbacks.length > 0 &&
          updatedTicketDetails.currentstatus !== "closed"
        ) {
          setTicketDetails((prevTicketDetails) => ({
            ...prevTicketDetails,
            currentstatus: "in progress",
          }));

          api
            .patch(`/api/tickets/${ticketId}/update-status`, {
              newStatus: "in progress",
            })
            .then((response) => {
              console.log("Ticket status updated successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error updating ticket status", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error adding feedback to ticket", error);
      });
  };

  const handleCloseTicket = () => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    if (ticketDetails.currentstatus !== "closed") {
      api
        .patch(`/api/tickets/${ticketId}/update-status`, {
          newStatus: "closed",
        })
        .then((response) => {
          setTicketDetails((prevTicketDetails) => ({
            ...prevTicketDetails,
            currentstatus: "closed",
          }));
          console.log("Ticket closed successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error closing ticket", error);
        });
    }
  };

  const handleGoBack = () => {
    navigate(`/employeepage/${ticketDetails.assignedTo}/view-tickets`);
  };

  if (!ticketDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-overall-container">
      <div className="ticket-details-wrapper">
        <button onClick={handleGoBack} className="back-button">
          Go Back
        </button>
        <h1 className="ticket-heading">Ticket Details</h1>
        <p className="ticket-detail">
          <b>Ticket Id: </b>
          {ticketDetails._id}
        </p>
        <p className="ticket-detail">
          <b>Description: </b>
          {ticketDetails.description}
        </p>
        <p className="ticket-detail">
          <b>Status: </b>
          {ticketDetails.currentstatus}
        </p>
        <p className="ticket-detail">
          <b>Created At: </b>
          {new Date(ticketDetails.createdAt).toLocaleString()}
        </p>
        <p className="ticket-detail">
          <b>Customer Name: </b>
          {ticketDetails.customerName}
        </p>
        <p className="ticket-detail">
          <b>Customer Email: </b>
          {ticketDetails.customerEmail}
        </p>
        <button onClick={handleCloseTicket} className="delete-ticket-button">
          Close Ticket
        </button>
        <div className="notes-section">
          <p className="notes-heading">Notes:</p>
          <ul className="notes-list">
            {ticketDetails.notes.map((note, index) => (
              <li key={index} className="note-item">
                {note.content}
              </li>
            ))}
          </ul>
        </div>
        {ticketDetails.feedbacks && ticketDetails.feedbacks.length > 0 && (
          <div className="feedbacks-section">
            <p className="feedbacks-heading">Responses:</p>
            <ul className="feedbacks-list">
              {ticketDetails.feedbacks.map((feedback) => (
                <li key={feedback._id} className="feedback-item">
                  {feedback.content} -{" "}
                  {new Date(feedback.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="add-note-section">
          <textarea
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            placeholder="Add a response..."
            className="note-textarea"
          />
          <button onClick={handleAddFeedback} className="add-note-button">
            Add Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTicketDetails;
