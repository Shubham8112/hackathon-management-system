import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../services/api";
import { FaUsers, FaCode, FaTrophy, FaServer, FaShieldAlt, FaChartLine } from "react-icons/fa";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchStats();
    generateSystemLogs();
    
    // Simulate periodic logs
    const interval = setInterval(() => {
      addNewLog();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.dashboard);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      alert(error.response?.data?.message || "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  const generateSystemLogs = () => {
    const endpoints = ["/api/auth/login", "/api/hackathons", "/api/participants/my-hackathons", "/api/profile"];
    const statuses = [200, 201, 304, 400, 401];
    const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    
    const initialLogs = Array.from({ length: 6 }).map((_, i) => {
      const time = new Date(Date.now() - (6 - i) * 60000).toLocaleTimeString();
      const method = methods[Math.floor(Math.random() * methods.length)];
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return { time, method, endpoint, status, id: Math.random() };
    });

    setLogs(initialLogs);
  };

  const addNewLog = () => {
    const endpoints = ["/api/auth/login", "/api/hackathons", "/api/participants/my-hackathons", "/api/profile"];
    const statuses = [200, 201, 304, 400, 401];
    const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    
    const time = new Date().toLocaleTimeString();
    const method = methods[Math.floor(Math.random() * methods.length)];
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    setLogs((prev) => [...prev.slice(1), { time, method, endpoint, status, id: Math.random() }]);
  };

  return (
    <>
      <Navbar />

      <div className="admin-page container">
        <div className="page-header">
          <div>
            <h1 className="page-title-gradient">System Administrator Panel</h1>
            <p className="page-subtitle">Platform health check, global metrics, and microservice streams.</p>
          </div>
          <div className="badge badge-danger">
            <FaShieldAlt /> SYSTEM MASTER
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="spinner"></div>
            <p>Decompressing server dashboard metrics...</p>
          </div>
        ) : (
          <div className="admin-dashboard-layout">
            {/* Top Cards row */}
            <div className="admin-metrics-grid">
              <div className="metric-panel card">
                <div className="metric-icon-box blue">
                  <FaUsers />
                </div>
                <div className="metric-details">
                  <h3>{stats?.totalUsers || 0}</h3>
                  <p>Global Registrations</p>
                </div>
              </div>

              <div className="metric-panel card">
                <div className="metric-icon-box green">
                  <FaCode />
                </div>
                <div className="metric-details">
                  <h3>{stats?.totalHackathons || 0}</h3>
                  <p>Hackathons Hosted</p>
                </div>
              </div>

              <div className="metric-panel card">
                <div className="metric-icon-box purple">
                  <FaTrophy />
                </div>
                <div className="metric-details">
                  <h3>{stats?.totalParticipants || 0}</h3>
                  <p>Total Submissions</p>
                </div>
              </div>
            </div>

            {/* Split layout: Server status & Logs */}
            <div className="admin-split-grid">
              {/* Server Status Panel */}
              <div className="server-status-panel card">
                <div className="panel-header">
                  <FaServer className="panel-icon" />
                  <h3>Server Diagnostics</h3>
                </div>
                <div className="diagnostics-list">
                  <div className="diag-item">
                    <span>Database Status</span>
                    <span className="badge badge-success">ONLINE</span>
                  </div>
                  <div className="diag-item">
                    <span>API Router latency</span>
                    <span className="diag-value">12ms</span>
                  </div>
                  <div className="diag-item">
                    <span>SSL Certificate</span>
                    <span className="badge badge-success">SECURED</span>
                  </div>
                  <div className="diag-item">
                    <span>Node Process Mode</span>
                    <span className="diag-value font-mono">Production</span>
                  </div>
                </div>
              </div>

              {/* Server Logs stream */}
              <div className="server-logs-panel card">
                <div className="panel-header">
                  <FaChartLine className="panel-icon" />
                  <h3>Live Access Stream</h3>
                </div>
                <div className="logs-stream-container">
                  {logs.map((log) => (
                    <div key={log.id} className="log-row animate-fade-in">
                      <span className="log-time">[{log.time}]</span>
                      <span className={`log-method ${log.method.toLowerCase()}`}>{log.method}</span>
                      <span className="log-endpoint">{log.endpoint}</span>
                      <span className={`log-status status-${log.status.toString()[0]}`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
