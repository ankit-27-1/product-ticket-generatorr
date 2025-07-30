import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileUpdate = ({ userId, onProfileUpdated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://ticket-support-system-backend-elxz.onrender.com/api/user/${userId}`
        );
        const { firstName, lastName, email } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://ticket-support-system-backend-elxz.onrender.com/api/user/${userId}`,
        {
          firstName,
          lastName,
          email,
        }
      );
      onProfileUpdated();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h3>Update Profile</h3>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default ProfileUpdate;
