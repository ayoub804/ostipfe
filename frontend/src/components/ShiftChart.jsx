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
        <div className="shifts-chart-v">
          <div className="chart-header-v">
            <h3>📊 Analyse de Production par Shift</h3>
            <div className="chart-legend-v">
              <span className="legend-item-v"><i className="dot s1"></i> Shift 1</span>
              <span className="legend-item-v"><i className="dot s2"></i> Shift 2</span>
              <span className="legend-item-v"><i className="dot s3"></i> Shift 3</span>
            </div>
          </div>
          <div className="chart-main-v">
            <div className="y-axis-v">
              <span>{maxVal}</span>
              <span>{Math.round(maxVal * 0.75)}</span>
              <span>{Math.round(maxVal * 0.5)}</span>
              <span>{Math.round(maxVal * 0.25)}</span>
              <span>0</span>
            </div>
            <div className="chart-container-v">
              {shiftHistory.map(day => (
                <div key={day.date} className="chart-group-v">
                  <div className="bars-v">
                    <div className="bar-v s1" style={{ height: `${(day.shift1 / maxVal) * 100}%` }} title={`Shift 1: ${day.shift1}`}>
                      {day.shift1 > 0 && <span className="bar-val-v">{day.shift1}</span>}
                      <div className="bar-glow"></div>
                    </div>
                    <div className="bar-v s2" style={{ height: `${(day.shift2 / maxVal) * 100}%` }} title={`Shift 2: ${day.shift2}`}>
                      {day.shift2 > 0 && <span className="bar-val-v">{day.shift2}</span>}
                      <div className="bar-glow"></div>
                    </div>
                    <div className="bar-v s3" style={{ height: `${(day.shift3 / maxVal) * 100}%` }} title={`Shift 3: ${day.shift3}`}>
                      {day.shift3 > 0 && <span className="bar-val-v">{day.shift3}</span>}
                      <div className="bar-glow"></div>
                    </div>
                  </div>
                  <div className="group-label-v">
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
