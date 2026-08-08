import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronLeft, FaCheck, FaTimes, FaUser, FaHourglassHalf, FaTrophy, FaCalendarCheck } from "react-icons/fa";
import "./Participants.css";

function Participants() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);
  const [hackathonTitle, setHackathonTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoadingMap, setActionLoadingMap] = useState({});

  useEffect(() => {
    fetchParticipants();
    fetchHackathonDetails();
  }, [id]);

  const fetchHackathonDetails = async () => {
    try {
      const response = await api.get(`/hackathons/${id}`);
      setHackathonTitle(response.data.hackathon?.title || "Hackathon Event");
    } catch (error) {
      console.error("Error fetching hackathon details:", error);
    }
  };

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/hackathons/${id}/participants`);
      setParticipants(response.data.participants || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
      alert(error.response?.data?.message || "Failed to load participants list");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (participantId, newStatus) => {
    setActionLoadingMap((prev) => ({ ...prev, [participantId]: true }));
    try {
      const response = await api.patch(`/participants/${participantId}`, {
        status: newStatus,
      });
      alert(response.data.message || "Status updated successfully!");
      // Refresh the list
      fetchParticipants();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update participant status");
    } finally {
      setActionLoadingMap((prev) => ({ ...prev, [participantId]: false }));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="badge badge-success">Approved</span>;
      case "rejected":
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return <span className="badge badge-warning">Pending</span>;
    }
  };

  return (
    <>
      <Navbar />

      <div className="participants-page container">
        <div className="form-back-header">
          <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm">
            <FaChevronLeft /> Back to Arena
          </button>
        </div>

        <div className="page-header">
          <div>
            <h1 className="page-title-gradient">Manage Registrations</h1>
            <p className="page-subtitle">Event: <b>{hackathonTitle}</b></p>
          </div>
          <div className="badge badge-info">
            <FaUser /> Total Joined: {participants.length}
          </div>
        </div>

        {loading ? (
          <div className="participants-loading">
            <div className="spinner"></div>
            <p>Fetching registrar documents...</p>
          </div>
        ) : participants.length === 0 ? (
          <div className="empty-participants card">
            <FaCalendarCheck className="empty-icon" />
            <h3>No Registrations Yet</h3>
            <p>Participants who register for this hackathon will appear here for review.</p>
          </div>
        ) : (
          <div className="participants-table-wrapper card">
            <table className="participants-table">
              <thead>
                <tr>
                  <th>Participant Details</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Review Actions</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => {
                  if (!participant.user) return null;
                  return (
                    <tr key={participant._id} className="participant-row">
                      <td>
                        <div className="user-details-cell">
                          <div className="user-avatar-placeholder">
                            {participant.user.name[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="participant-name">{participant.user.name}</p>
                            <p className="participant-email">{participant.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="join-date">
                          {new Date(participant.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td>{getStatusBadge(participant.status)}</td>
                      <td style={{ textAlign: "right" }}>
                        <div className="actions-cell">
                          {participant.status === "registered" ? (
                            <>
                              <button
                                className="btn btn-primary btn-sm approve-btn"
                                onClick={() => handleUpdateStatus(participant._id, "approved")}
                                disabled={actionLoadingMap[participant._id]}
                              >
                                <FaCheck /> Approve
                              </button>
                              <button
                                className="btn btn-secondary btn-sm reject-btn"
                                onClick={() => handleUpdateStatus(participant._id, "rejected")}
                                disabled={actionLoadingMap[participant._id]}
                              >
                                <FaTimes /> Reject
                              </button>
                            </>
                          ) : (
                            <span className="reviewed-placeholder">
                              Reviewed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Participants;