import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
