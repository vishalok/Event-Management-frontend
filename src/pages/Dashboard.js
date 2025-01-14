import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import {jwtDecode} from "jwt-decode";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  let isGuest = false;

  // Decode the token to check if the user is a guest
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isGuest = decoded.email === "guest@example.com";
    } catch (err) {
      console.error("Invalid token:", err.message);
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Start loading
        const { data } = await API.get("/events");
        setEvents(data);
      } catch (err) {
        alert("Failed to load events");
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="dashboard">
      <h2>Upcoming Events</h2>
      {!isGuest && (
        <Link to="/create-event" className="create-event-btn">
          Create Event
        </Link>
      )}
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found. Check back later!</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <Link to={`/event/${event._id}`} key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <h7>{event.description}</h7>
              <p>{new Date(event.date).toLocaleString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
