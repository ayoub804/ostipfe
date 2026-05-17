import React from "react";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, Zap } from "lucide-react";

export default function HomeView() {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Advanced Machine Monitoring</h1>
        <p>Track production, identify bottlenecks, and ensure optimal performance across all your manufacturing lines in real-time.</p>
        <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <Activity size={40} className="feature-icon" />
          <h3>Real-Time Analytics</h3>
          <p>Monitor your machines and receive instantaneous updates on production status, errors, and efficiency.</p>
        </div>
        <div className="feature-card">
          <Zap size={40} className="feature-icon" />
          <h3>Performance Tracking</h3>
          <p>Analyze shift performance, total production, and detect anomalies early to maximize output.</p>
        </div>
        <div className="feature-card">
          <ShieldCheck size={40} className="feature-icon" />
          <h3>Predictive Maintenance</h3>
          <p>Stay ahead of breakdowns by analyzing historical error patterns and maintenance logs.</p>
        </div>
      </section>
    </div>
  );
}