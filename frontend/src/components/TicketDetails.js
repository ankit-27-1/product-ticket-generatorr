import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/ticketdetails.css";

const TicketDetails = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .get(`/api/tickets/${ticketId}/details`)
      .then((response) => {
        setTicketDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ticket details", error);
      });
  }, [ticketId]);

  const handleAddNote = () => {
    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post(`/api/tickets/${ticketId}/add-note`, { content: noteContent })
      .then((response) => {
        setTicketDetails(response.data);
        setNoteContent("");
      })
      .catch((error) => {
        console.error("Error adding note to ticket", error);
      });
  };

  const handleDeleteTicket = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (isConfirmed) {
      const api = axios.create({
        baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
      });

      console.log("Deleting ticket with ID:", ticketId);
      api
        .delete(`/api/tickets/${ticketId}/delete`)
        .then(() => {
          const userId = ticketDetails.userId;
          navigate(`/userpage/${userId}/view-tickets`);
        })
        .catch((error) => {
          console.error("Error deleting ticket", error);
        });
    }
  };

  const handleGoBack = () => {
    navigate(`/userpage/${ticketDetails.userId}/view-tickets`);
  };

  if (!ticketDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-overall-container">
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
          <b>Product Type: </b>
          {ticketDetails.productType}
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
          <b>Description: </b>
          {ticketDetails.description}
        </p>
        <button onClick={handleDeleteTicket} className="delete-ticket-button">
          Delete Ticket
        </button>
        {ticketDetails.notes && ticketDetails.notes.length > 0 && (
          <div className="notes-section">
            <h3 className="notes-heading">Notes</h3>
            <ul className="notes-list">
              {ticketDetails.notes.map((note) => (
                <li key={note._id} className="note-item">
                  {note.content} - {new Date(note.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="add-note-section">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add a note..."
            className="note-textarea"
          />
          <button onClick={handleAddNote} className="add-note-button">
            Add Note
          </button>
        </div>
        <div className="feedbacks-section">
          <p className="feedbacks-heading">Responses:</p>
          <ul className="feedbacks-list">
            {ticketDetails.feedbacks.map((feedback, index) => (
              <li key={index} className="feedback-item">
                {feedback.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
