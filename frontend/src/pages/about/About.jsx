import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaTerminal, FaTrophy, FaUsers, FaCompass, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-page container">
        {/* Banner Section */}
        <header className="about-hero card">
          <div className="about-hero-content">
            <div className="about-logo-wrapper">
              <FaTerminal className="about-logo-icon" />
              <h2>Hack<span className="logo-accent">Verse</span></h2>
            </div>
            <h1 className="about-hero-title">The Ultimate Arena for Builders</h1>
            <p className="about-hero-subtitle">
              Bridging the gap between brilliant ideas and production-grade prototypes. 
              HackVerse provides tools to coordinate, register, audit, and compete in modern hackathons.
            </p>
          </div>
        </header>

        {/* Highlight Stats Row */}
        <section className="stats-showcase">
          <div className="showcase-card">
            <h3>10K+</h3>
            <p>Active Hackers</p>
          </div>
          <div className="showcase-card">
            <h3>500+</h3>
            <p>Events Deployed</p>
          </div>
          <div className="showcase-card">
            <h3>$250K+</h3>
            <p>Prizes Claimed</p>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="features-section">
          <h2 className="features-title">Designed for Competitive Creativity</h2>
          <div className="features-grid">
            <div className="feature-item card">
              <div className="feature-icon-wrapper blue">
                <FaCompass />
              </div>
              <h3>Explore Arenas</h3>
              <p>Filter hackathons by mode (online, offline, hybrid) and timeline. Find your next challenge.</p>
            </div>

            <div className="feature-item card">
              <div className="feature-icon-wrapper purple">
                <FaLightbulb />
              </div>
              <h3>Empowered Organizers</h3>
              <p>Deploy events with start/end schedules, guidelines, and custom venue registrations in minutes.</p>
            </div>

            <div className="feature-item card">
              <div className="feature-icon-wrapper green">
                <FaShieldAlt />
              </div>
              <h3>Auditing & Approvals</h3>
              <p>Organizers can review registration applications, approve teammates, and audit logs securely.</p>
            </div>
          </div>
        </section>

        {/* Footer/Mission Section */}
        <footer className="about-footer-block card">
          <h3>Our Mission</h3>
          <p>
            We believe that hackers shape the future. HackVerse is open-sourced and built by developers, 
            for developers. Run on high-concurrency Node.js Express endpoints with Mongoose models, it is 
            lightweight, robust, and lightning-fast.
          </p>
          <div className="developer-tag">
            <span>Powered by Gemini 3.5 & React 19</span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default About;