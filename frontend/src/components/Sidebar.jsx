import ComputerIcon from "./ComputerIcon";
import { togglePause, restart, updateSettings, jumpPoste, updateFilter } from "../api";

function toLocalInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function Sidebar({ view, setView, user, setUser, selected, detail, onRefresh, filterStart, setFilterStart, filterEnd, setFilterEnd, jumpTime, setJumpTime }) {
  const inDetail = selected && detail;

  async function doAction(fn) { await fn; onRefresh(); }

  return (
    <aside className="sidebar">
      <div className="nav-tabs">
        <button className={`nav-tab ${view === "monitoring" ? "active" : ""}`} onClick={() => setView("monitoring")}>
          <ComputerIcon className="nav-icon" /> Monitoring
        </button>
        <button className={`nav-tab ${view === "maintenance" ? "active" : ""}`} onClick={() => setView("maintenance")}>
          🔧 Maintenance
        </button>
      </div>

      <hr />

      {!inDetail && view === "monitoring" && (
        <div>
          <h3>Couleurs des machines</h3>
          <ul className="legend">
            <li>🟢 Vert : production active (ou défaut qualité)</li>
            <li>🔴 Rouge : arrêt machine / erreur signalée</li>
            <li>⚪ Gris : inactivité (&gt;= 15 min)</li>
          </ul>

        </div>
      )}

      {!inDetail && view === "maintenance" && (
        <div className="auth-status">
          {user ? (
            <>
              <p>Connecté : <strong>{user.email}</strong></p>
              <button className="btn btn-ghost btn-full" style={{ marginTop: 8 }} onClick={() => setUser(null)}>Déconnexion</button>
            </>
          ) : (
            <p style={{ color: "var(--text-dim)" }}>Connectez-vous pour gérer les maintenances.</p>
          )}
        </div>
      )}

      {inDetail && (
        <>
          <h3>Contrôle simulation</h3>
          <div className="sidebar-section">
            <button className="btn btn-primary btn-full" onClick={() => doAction(togglePause(selected))}>
              {detail.isPaused ? "▶ Reprendre" : "⏸ Pause"}
            </button>
            <button className="btn btn-ghost btn-full" onClick={() => doAction(restart(selected))}>🔄 Restart</button>
          </div>

          <div className="sidebar-section">
            <div className="label-row">
              <label className="sidebar-label">Vitesse</label>
              <span className="value-badge">{detail.timeJumpValue} {detail.timeJumpUnit}</span>
            </div>
            <div className="input-row">
              <input type="range" min="1" max="60" value={detail.timeJumpValue}
                onChange={e => doAction(updateSettings(selected, { simDelay: detail.simDelay, timeJumpValue: +e.target.value, timeJumpUnit: detail.timeJumpUnit }))} />
              <select className="unit-select" value={detail.timeJumpUnit}
                onChange={e => doAction(updateSettings(selected, { simDelay: detail.simDelay, timeJumpValue: detail.timeJumpValue, timeJumpUnit: e.target.value }))}>
                <option>Sec</option><option>Min</option><option>Hrs</option>
              </select>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="label-row">
              <label className="sidebar-label">Rafraîchissement</label>
              <span className="value-badge">{detail.simDelay}s</span>
            </div>
            <input type="range" min="0.1" max="3" step="0.1" value={detail.simDelay}
              onChange={e => doAction(updateSettings(selected, { simDelay: +e.target.value, timeJumpValue: detail.timeJumpValue, timeJumpUnit: detail.timeJumpUnit }))} />
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Sauter à un temps</label>
            <input className="date-input" type="datetime-local" value={jumpTime || toLocalInputValue(detail.currentSimTime)} onChange={e => setJumpTime(e.target.value)} />
            <button className="btn btn-primary btn-full" onClick={() => { doAction(jumpPoste(selected, jumpTime || toLocalInputValue(detail.currentSimTime))); setJumpTime(""); }}>Go</button>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Filtre de production</label>
            <div className="filter-inputs">
              <div className="date-field"><span>Du :</span><input className="date-input" type="datetime-local" value={filterStart} onChange={e => setFilterStart(e.target.value)} /></div>
              <div className="date-field"><span>Au :</span><input className="date-input" type="datetime-local" value={filterEnd} onChange={e => setFilterEnd(e.target.value)} /></div>
            </div>
            <button className="btn btn-primary btn-full" onClick={() => doAction(updateFilter(selected, filterStart, filterEnd))}>Appliquer le filtre</button>
          </div>
        </>
      )}
    </aside>
  );
}
