import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await API.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        alert("Failed to load event details");
      }
    };
    fetchEvent();
  }, [id]);

  const handleAttend = async () => {
    try {
      const { data } = await API.post(`/events/${id}/attend`);
      setEvent(data);
      alert("You have successfully registered for this event!");
    } catch (err) {
      alert("Failed to register for the event");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <button onClick={handleAttend}>Register for Event</button>
      <h3>Attendees:</h3>
      <ul>
        {event.attendees.map((attendee) => (
          <li key={attendee._id}>{attendee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
