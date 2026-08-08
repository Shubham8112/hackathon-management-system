import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaGlobe, FaChevronLeft, FaArrowRight, FaKeyboard } from "react-icons/fa";
import "./CreateHackathon.css";

function CreateHackathon() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    mode: "Online",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for that field
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(formData.startDate).getTime();
    const end = new Date(formData.endDate).getTime();
    const deadline = new Date(formData.registrationDeadline).getTime();

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.registrationDeadline) newErrors.registrationDeadline = "Registration deadline is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (formData.startDate && start < today) {
      newErrors.startDate = "Start date cannot be in the past";
    }
    if (formData.startDate && formData.endDate && end < start) {
      newErrors.endDate = "End date must be after start date";
    }
    if (formData.startDate && formData.registrationDeadline && deadline > start) {
      newErrors.registrationDeadline = "Registration deadline must be before start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post("/hackathons", formData);
      alert(response.data.message || "Hackathon created successfully!");
      navigate("/hackathons");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create hackathon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-page-container container">
        <div className="form-back-header">
          <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm">
            <FaChevronLeft /> Back to Arena
          </button>
        </div>

        <div className="form-card-wrapper card">
          <div className="form-card-header">
            <div className="form-header-icon-wrapper">
              <FaKeyboard />
            </div>
            <div>
              <h2>Create New Hackathon</h2>
              <p>Fill out the details below to deploy your coding event on HackVerse.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="premium-form">
            <div className="form-grid">
              {/* Event Title */}
              <div className="form-group full-width">
                <label htmlFor="title">Event Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="e.g. Winter Hackathon 2026"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                {errors.title && <span className="field-error-msg">{errors.title}</span>}
              </div>

              {/* Description */}
              <div className="form-group full-width">
                <label htmlFor="description">Event Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Write a clear outline of prompts, prizes, track details, and eligibility criteria..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                {errors.description && <span className="field-error-msg">{errors.description}</span>}
              </div>

              {/* Start Date */}
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-field-icon" />
                  <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.startDate && <span className="field-error-msg">{errors.startDate}</span>}
              </div>

              {/* End Date */}
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-field-icon" />
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.endDate && <span className="field-error-msg">{errors.endDate}</span>}
              </div>

              {/* Registration Deadline */}
              <div className="form-group">
                <label htmlFor="registrationDeadline">Registration Deadline</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-field-icon" />
                  <input
                    id="registrationDeadline"
                    type="date"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.registrationDeadline && (
                  <span className="field-error-msg">{errors.registrationDeadline}</span>
                )}
              </div>

              {/* Event Mode */}
              <div className="form-group">
                <label htmlFor="mode">Mode of Event</label>
                <div className="input-with-icon">
                  <FaGlobe className="input-field-icon" />
                  <select id="mode" name="mode" value={formData.mode} onChange={handleChange}>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="form-group full-width">
                <label htmlFor="location">Venue Location / Join Link</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-field-icon" />
                  <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="e.g. San Francisco Main Campus / Zoom URL"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.location && <span className="field-error-msg">{errors.location}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Deploying Event..." : "Deploy Hackathon"}
                {!loading && <FaArrowRight />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateHackathon;