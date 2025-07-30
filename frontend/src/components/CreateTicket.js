import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../styling/createticket.css";

const CreateTickets = () => {
  const { userId } = useParams();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [productType, setProductType] = useState("iphone");
  const [description, setDescription] = useState("");
  const productOptions = ["iphone", "ipad", "iwatch"];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreateTicket = () => {
    if (!emailRegex.test(customerEmail)) {
      window.alert("Invalid email format");
      return;
    }

    const newTicket = {
      customerName,
      customerEmail,
      productType,
      description,
      userId,
      currentstatus: "open",
    };

    const api = axios.create({
      baseURL: "https://ticket-support-system-backend-elxz.onrender.com",
    });

    api
      .post("/api/tickets/create", newTicket)
      .then((response) => {
        console.log("Ticket created successfully", response.data);
        window.alert("Ticket created successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          window.alert("No employees found with the required specialization");
        } else {
          console.error("Error creating ticket", error);
          window.alert("An error occurred while creating the ticket");
        }
      });
  };

  return (
    <div className="create-ticket-container">
      <h2 className="create-ticket-title">Create Tickets</h2>
      <div className="create-ticket-form-container">
        <form className="create-ticket-form">
          <div className="create-ticket-formGroup">
            <label className="create-ticket-label">Customer Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="create-ticket-input"
            />
          </div>
          <div className="create-ticket-formGroup">
            <label className="create-ticket-label">Customer Email:</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter customer email"
              className="create-ticket-input"
            />
          </div>
          <div className="create-ticket-formGroup">
            <label className="create-ticket-label">Product Type:</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="create-ticket-select"
            >
              {productOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="create-ticket-formGroup">
            <label className="create-ticket-label">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter ticket description"
              className="create-ticket-textarea"
            />
          </div>
          <button
            type="button"
            onClick={handleCreateTicket}
            className="create-ticket-button"
          >
            Create Ticket
          </button>
          <Link
            to={`/userpage/${userId}`}
            className="create-ticket-goBackButton"
          >
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateTickets;
