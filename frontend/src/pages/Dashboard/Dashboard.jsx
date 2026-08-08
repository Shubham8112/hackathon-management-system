import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext/AuthContext";
import api from "../../services/api";
import { FaCode, FaUsers, FaTrophy, FaCalendarCheck, FaPlusCircle, FaCompass, FaChevronRight, FaTerminal } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const { user, isAdmin, isOrganizer, isParticipant } = useAuth();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [generalStats, setGeneralStats] = useState({
    totalHackathons: 0,
    myRegistrations: 0,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchAdminStats();
    } else {
      fetchUserDashboardOverview();
    }
  }, [isAdmin]);

  const fetchAdminStats = async () => {
    setLoadingStats(true);
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.dashboard);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUserDashboardOverview = async () => {
    setLoadingStats(true);
    try {
      // Fetch total hackathons count
      const hackathonsResponse = await api.get("/hackathons");
      const totalHacks = hackathonsResponse.data.hackathons?.length || 0;

      let registeredCount = 0;
      if (isParticipant) {
        // Fetch participant registered count
        const registrationsResponse = await api.get("/participants/my-hackathons");
        registeredCount = registrationsResponse.data.participant?.length || 0;
      }

      setGeneralStats({
        totalHackathons: totalHacks,
        myRegistrations: registeredCount,
      });
    } catch (error) {
      console.error("Error fetching dashboard overview:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-page-container container">
        {/* Welcome Section */}
        <header className="dashboard-hero">
          <div className="hero-left">
            <span className="welcome-tag">SYSTEM ONLINE</span>
            <h1 className="hero-title">Welcome back, {user?.name}!</h1>
            <p className="hero-subtitle">
              Manage registrations, coordinate events, and build solutions on the ultimate coding arena.
            </p>
            <div className="hero-badges">
              <span className={`badge role-${user?.role}`}>{user?.role} portal</span>
              <span className="badge badge-info">V1.0.0</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="terminal-preview">
              <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">status.sh</span>
              </div>
              <div className="terminal-body">
                <p className="term-line"><span className="term-prompt">$</span> whoami</p>
                <p className="term-output text-primary">{user?.name}</p>
                <p className="term-line"><span className="term-prompt">$</span> echo $ROLE</p>
                <p className="term-output role-color">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Admin stats */}
        {isAdmin && (
          <section className="stats-section">
            <h2 className="section-title">System Metrics</h2>
            {loadingStats ? (
              <div className="loading-placeholder">Calculating portal stats...</div>
            ) : (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon-wrapper users">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Total Platform Users</span>
                    <span className="stat-value">{stats?.totalUsers || 0}</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper hackathons">
                    <FaCode />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Total Hackathons</span>
                    <span className="stat-value">{stats?.totalHackathons || 0}</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper participants">
                    <FaTrophy />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Total Registrations</span>
                    <span className="stat-value">{stats?.totalParticipants || 0}</span>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Regular User stats */}
        {!isAdmin && (
          <section className="stats-section">
            <h2 className="section-title">Platform Activity</h2>
            <div className="stats-grid">
              <Link to="/hackathons" className="stat-card clickable">
                <div className="stat-icon-wrapper hackathons">
                  <FaCompass />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Available Hackathons</span>
                  <span className="stat-value">{generalStats.totalHackathons}</span>
                </div>
                <FaChevronRight className="card-arrow" />
              </Link>

              <Link to="/my-hackathons" className="stat-card clickable">
                <div className="stat-icon-wrapper participants">
                  <FaCalendarCheck />
                </div>
                <div className="stat-info">
                  <span className="stat-label">My Registrations</span>
                  <span className="stat-value">{generalStats.myRegistrations}</span>
                </div>
                <FaChevronRight className="card-arrow" />
              </Link>
            </div>
          </section>
        )}

        {/* Quick Actions Grid */}
        <section className="actions-section">
          <h2 className="section-title">Quick Tasks</h2>
          <div className="actions-grid">
            <div className="action-card card">
              <div className="action-card-header">
                <FaCode className="action-icon" />
                <h3>Explore Arena</h3>
              </div>
              <p>Browse through ongoing, upcoming, and past hackathons. Compete or analyze submissions.</p>
              <Link to="/hackathons" className="btn btn-outline">
                View Hackathons
              </Link>
            </div>

            {(isAdmin || isOrganizer) && (
              <div className="action-card card">
                <div className="action-card-header">
                  <FaPlusCircle className="action-icon icon-organizer" />
                  <h3>Host Hackathon</h3>
                </div>
                <p>Set up rules, timeline, guidelines, and invite participants to compete under your custom event.</p>
                <Link to="/create-hackathon" className="btn btn-primary">
                  Create Event
                </Link>
              </div>
            )}

            {isParticipant && (
              <div className="action-card card">
                <div className="action-card-header">
                  <FaTrophy className="action-icon icon-participant" />
                  <h3>My Registrations</h3>
                </div>
                <p>Review the hackathons you have joined, monitor acceptance statuses, and coordinate links.</p>
                <Link to="/my-hackathons" className="btn btn-outline">
                  My Portal
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;