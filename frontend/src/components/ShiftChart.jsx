import { useState } from "react";

export default function ShiftChart({ shiftHistory }) {
  const [open, setOpen] = useState(false);
  if (!shiftHistory || shiftHistory.length === 0) return null;
  const maxVal = Math.max(...shiftHistory.map(d => Math.max(d.shift1, d.shift2, d.shift3)), 1);

  return (
    <>
      <button className={`expand-btn ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="#a855f7" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="shifts-chart">
          <div className="chart-header">
            <h3>📊 Analyse de Production par Shift</h3>
            <div className="chart-legend">
              <span className="legend-item"><i className="dot s1" /> Shift 1</span>
              <span className="legend-item"><i className="dot s2" /> Shift 2</span>
              <span className="legend-item"><i className="dot s3" /> Shift 3</span>
            </div>
          </div>
          <div className="chart-main">
            <div className="y-axis">
              <span>{maxVal}</span>
              <span>{Math.round(maxVal * 0.75)}</span>
              <span>{Math.round(maxVal * 0.5)}</span>
              <span>{Math.round(maxVal * 0.25)}</span>
              <span>0</span>
            </div>
            <div className="chart-container">
              {shiftHistory.map(day => (
                <div key={day.date} className="chart-group">
                  <div className="bars">
                    {["shift1", "shift2", "shift3"].map((s, i) => (
                      <div key={s} className={`bar s${i + 1}`} style={{ height: `${(day[s] / maxVal) * 100}%` }} title={`Shift ${i + 1}: ${day[s]}`}>
                        {day[s] > 0 && <span className="bar-val">{day[s]}</span>}
                      </div>
                    ))}
                  </div>
                  <div className="group-label">
                    <span className="day-name">{new Date(day.date).toLocaleDateString("fr-FR", { weekday: "short" })}</span>
                    <span className="day-date">{new Date(day.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
