import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import { FaLaptop, FaMapMarkerAlt, FaCalendarAlt, FaTrash, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaTrophy } from "react-icons/fa";
import "./MyHackathons.css";

function MyHackathons() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingMap, setCancellingMap] = useState({});

  useEffect(() => {
    fetchMyHackathons();
  }, []);

  const fetchMyHackathons = async () => {
    setLoading(true);
    try {
      const response = await api.get("/participants/my-hackathons");
      setRegistrations(response.data.participant || []);
    } catch (error) {
      console.error("Error fetching registered hackathons:", error);
      alert(error.response?.data?.message || "Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (participantId) => {
    if (!window.confirm("Are you sure you want to cancel your registration for this hackathon?")) return;

    setCancellingMap((prev) => ({ ...prev, [participantId]: true }));
    try {
      const response = await api.delete(`/participants/${participantId}`);
      alert(response.data.message || "Registration cancelled successfully.");
      fetchMyHackathons();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel registration");
    } finally {
      setCancellingMap((prev) => ({ ...prev, [participantId]: false }));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="badge badge-success">
            <FaCheckCircle /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="badge badge-danger">
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return (
          <span className="badge badge-warning">
            <FaHourglassHalf /> Applied
          </span>
        );
    }
  };

  return (
    <>
      <Navbar />

      <div className="my-hackathons-page container">
        <div className="page-header">
          <div>
            <h1 className="page-title-gradient">My Registrations</h1>
            <p className="page-subtitle">Track your status, schedules, and active competition profiles.</p>
          </div>
        </div>

        {loading ? (
          <div className="my-hacks-loading">
            <div className="spinner"></div>
            <p>Retransmitting dashboard registry...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="empty-registrations card">
            <FaTrophy className="empty-icon" />
            <h3>No Registrations Found</h3>
            <p>You haven't joined any hackathons yet. Explore the Arena and register for events!</p>
          </div>
        ) : (
          <div className="my-hackathons-grid grid-cols-3">
            {registrations.map((item) => {
              if (!item.hackathon) return null;
              return (
                <article key={item._id} className="hackathon-card card">
                  <div className="card-top-meta">
                    {getStatusBadge(item.status)}
                    <span className="date-badge">
                      <FaCalendarAlt />
                      {new Date(item.hackathon.startDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="card-content">
                    <h3 className="hackathon-title">{item.hackathon.title}</h3>
                    <p className="hackathon-desc">{item.hackathon.description}</p>

                    <div className="hackathon-details">
                      <div className="detail-item">
                        <FaCalendarAlt className="detail-icon" />
                        <span>
                          {new Date(item.hackathon.startDate).toLocaleDateString()} - {new Date(item.hackathon.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>{item.hackathon.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions-wrapper">
                    <button
                      className="btn btn-secondary btn-outline btn-danger cancel-btn"
                      onClick={() => handleCancel(item._id)}
                      disabled={cancellingMap[item._id]}
                    >
                      <FaTrash />
                      {cancellingMap[item._id] ? "Cancelling..." : "Cancel Application"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default MyHackathons;