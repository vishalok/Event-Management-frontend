import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event._id}`} className="event-card">
      <h3>{event.name}</h3>
      <p>{new Date(event.date).toLocaleString()}</p>
    </Link>
  );
};

export default EventCard;
