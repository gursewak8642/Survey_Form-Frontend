import React, { useState } from "react";
import "./User.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


const User = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);
console.log(userName);
  const navigate = useNavigate();
const url = "http://localhost:8000"
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name) {
      try {
        // Make a POST request to your API endpoint
       const res= await axios.post(`${url}/api/create-user`, { name: name }); // Corrected the URL string and added data
       if(res.data.success) {
         dispatch({
           type: 'SET_USER_NAME',
           payload: res.data.data.Name
         })
         localStorage.setItem("UserID", res.data.data.ID.toString());
         navigate("/survey"); // Navigate to the "/survey" route
       }
      } catch (error) {
        console.error("Error:", error);
        // Handle errors if any
      }
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="login-container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default User;
