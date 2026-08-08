import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaLaptop, FaEdit, FaTrash, FaUsers, FaRegClock, FaGlobe, FaChevronRight } from "react-icons/fa";
import "./AllHackathons.css";

function AllHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [registeringMap, setRegisteringMap] = useState({});

  const { user, isAdmin, isOrganizer, isParticipant } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const response = await api.get("/hackathons");
      setHackathons(response.data.hackathons || []);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (hackathonId) => {
    setRegisteringMap((prev) => ({ ...prev, [hackathonId]: true }));
    try {
      const response = await api.post(`/participants/register/${hackathonId}`, {});
      alert(response.data.message || "Registered successfully!");
      // Optionally refresh after registration
      fetchHackathons();
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setRegisteringMap((prev) => ({ ...prev, [hackathonId]: false }));
    }
  };

  const handleDelete = async (hackathonId) => {
    if (!window.confirm("Are you sure you want to delete this hackathon?")) return;

    try {
      const response = await api.delete(`/hackathons/${hackathonId}`);
      alert(response.data.message || "Hackathon deleted successfully.");
      fetchHackathons();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete hackathon");
    }
  };

  // Filter hackathons based on search and mode
  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch =
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMode =
      modeFilter === "All" || hackathon.mode === modeFilter;

    return matchesSearch && matchesMode;
  });

  const getModeIcon = (mode) => {
    switch (mode) {
      case "Online":
        return <FaGlobe />;
      case "Offline":
        return <FaMapMarkerAlt />;
      default:
        return <FaLaptop />;
    }
  };

  const getModeBadgeClass = (mode) => {
    switch (mode) {
      case "Online":
        return "badge-info";
      case "Offline":
        return "badge-success";
      default:
        return "badge-warning";
    }
  };

  const isOrganizerOfHackathon = (hackathon) => {
    if (!user) return false;
    const organizerId = typeof hackathon.organizer === "object" ? hackathon.organizer._id : hackathon.organizer;
    return user.id === organizerId;
  };

  return (
    <>
      <Navbar />

      <div className="hackathons-page container">
        <div className="page-header">
          <div>
            <h1 className="page-title-gradient">Hackathon Arena</h1>
            <p className="page-subtitle">Discover challenges, form alliances, and build features.</p>
          </div>
          {(isAdmin || isOrganizer) && (
            <Link to="/create-hackathon" className="btn btn-primary">
              Host New Event
            </Link>
          )}
        </div>

        {/* Filter controls */}
        <div className="filter-controls-bar">
          <div className="search-box-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mode-filter-tabs">
            {["All", "Online", "Offline", "Hybrid"].map((mode) => (
              <button
                key={mode}
                className={`filter-tab ${modeFilter === mode ? "active" : ""}`}
                onClick={() => setModeFilter(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="arena-loading">
            <div className="spinner"></div>
            <p>Scanning Arena database...</p>
          </div>
        ) : filteredHackathons.length === 0 ? (
          <div className="empty-arena">
            <FaLaptop className="empty-icon" />
            <h3>No Hackathons Found</h3>
            <p>Try refining your search keywords or switching filters.</p>
            {searchTerm || modeFilter !== "All" ? (
              <button className="btn btn-secondary btn-sm" onClick={() => { setSearchTerm(""); setModeFilter("All"); }}>
                Reset Filters
              </button>
            ) : null}
          </div>
        ) : (
          <div className="hackathons-grid grid-cols-3">
            {filteredHackathons.map((hackathon) => (
              <article key={hackathon._id} className="hackathon-card card">
                <div className="card-top-meta">
                  <span className={`badge ${getModeBadgeClass(hackathon.mode)}`}>
                    {getModeIcon(hackathon.mode)}
                    {hackathon.mode}
                  </span>
                  <span className="deadline-badge" title="Registration Deadline">
                    <FaRegClock />
                    {new Date(hackathon.registrationDeadline).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="card-content">
                  <h3 className="hackathon-title">{hackathon.title}</h3>
                  <p className="hackathon-desc">{hackathon.description}</p>
                  
                  <div className="hackathon-details">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span>
                        {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>{hackathon.location}</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions-wrapper">
                  {/* Participant registration actions */}
                  {isParticipant && (
                    <button
                      className="btn btn-primary register-btn"
                      onClick={() => handleRegister(hackathon._id)}
                      disabled={registeringMap[hackathon._id]}
                    >
                      {registeringMap[hackathon._id] ? "Joining..." : "Register now"}
                      <FaChevronRight />
                    </button>
                  )}

                  {/* Creator / Admin management actions */}
                  {(isAdmin || isOrganizerOfHackathon(hackathon)) && (
                    <div className="management-buttons">
                      <Link to={`/participants/${hackathon._id}`} className="btn btn-secondary btn-sm flex-grow" title="Manage Registrations">
                        <FaUsers />
                        <span>Participants</span>
                      </Link>
                      <Link to={`/update-hackathon/${hackathon._id}`} className="btn btn-secondary btn-sm icon-only-btn" title="Edit Event">
                        <FaEdit />
                      </Link>
                      <button className="btn btn-danger btn-sm icon-only-btn" onClick={() => handleDelete(hackathon._id)} title="Delete Event">
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllHackathons;