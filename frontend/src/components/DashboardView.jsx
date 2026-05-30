import { useMemo, useState } from "react";
import ComputerIcon from "./ComputerIcon";
import ShiftChart from "./ShiftChart";
import { exportHistoryUrl } from "../api";

export default function DashboardView({ detail, selected, onBack }) {
  const [spliceSearch, setSpliceSearch] = useState("");
  const [exportStart, setExportStart] = useState("");
  const [exportEnd, setExportEnd] = useState("");

  const shiftFilterRows = useMemo(() => {
    if (!detail) return [];
    return [
      { label: "Shift 1 (06:00-14:30)", value: detail.shiftFilter.shift1 },
      { label: "Shift 2 (14:30-22:00)", value: detail.shiftFilter.shift2 },
      { label: "Shift 3 (22:00-06:00)", value: detail.shiftFilter.shift3 },
    ];
  }, [detail]);

  if (!detail) return null;

  function downloadHistory() {
    if (!exportStart || !exportEnd) { alert("Veuillez sélectionner une plage de dates."); return; }
    window.open(exportHistoryUrl(selected, exportStart, exportEnd), "_blank");
  }

  return (
    <div>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 16 }}>← Retour à l'accueil</button>
      <h1 className="page-title">Suivi — {detail.name}</h1>

      <div className="kpi-row">
        <div className={`big-status ${detail.statusColor}`}>
          <ComputerIcon className="pc-icon" />
        </div>
        <div className="shift-circle">
          <div>SHIFT</div>
          <strong>{detail.totalShift}</strong>
          <small>PIÈCES</small>
        </div>
        {detail.temperature && detail.temperature !== "---" && (
          <div className={`shift-circle temp-${detail.temperatureColor || "gray"}`}>
            <div>TEMP</div>
            <strong>{detail.temperature}</strong>
          </div>
        )}
        <div className="meta-info">
          <div>Statut : <span>{detail.statusText}</span></div>
          <div>Temps simulé : <span>{new Date(detail.currentSimTime).toLocaleString()}</span></div>
          <div>Dernière activité : <span>{detail.lastActivity || "---"}</span></div>
        </div>
      </div>

      <div className="metrics">
        <div className="metric">Total filtrées<div className="metric-val">{detail.totalFiltered}</div></div>
        <div className="metric">Aujourd'hui<div className="metric-val">{detail.totalToday}</div></div>
        <div className="metric">Splice actuel<div className="metric-val">{detail.spliceCurrent}</div></div>
      </div>

      <h3 style={{ marginBottom: 8 }}>Shifts — jour simulé</h3>
      <table>
        <tbody>
          <tr><td>Shift 1 (06:00-14:30)</td><td>{detail.shiftDay.shift1}</td></tr>
          <tr><td>Shift 2 (14:30-22:00)</td><td>{detail.shiftDay.shift2}</td></tr>
          <tr><td>Shift 3 (22:00-06:00)</td><td>{detail.shiftDay.shift3}</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>{detail.shiftDay.total}</strong></td></tr>
        </tbody>
      </table>

      <h3 style={{ marginBottom: 8 }}>Shifts — filtre</h3>
      <table>
        <tbody>
          {shiftFilterRows.map(r => <tr key={r.label}><td>{r.label}</td><td>{r.value}</td></tr>)}
        </tbody>
      </table>

      <ShiftChart shiftHistory={detail.shiftHistory} />

      <div className="section-header">
        <h3>Détails par splice</h3>
        <div className="search-box">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Rechercher un splice..." value={spliceSearch} onChange={e => setSpliceSearch(e.target.value)} />
        </div>
      </div>
      <table>
        <thead><tr><th>Nom</th><th>Quantité</th></tr></thead>
        <tbody>
          {detail.breakdown.filter(r => r.name.toLowerCase().includes(spliceSearch.toLowerCase())).map((r, i) => (
            <tr key={`${r.name}-${i}`}><td>{r.name}</td><td>{r.qty}</td></tr>
          ))}
        </tbody>
      </table>

      <div className="section-header">
        <h3>Historique des activités</h3>
        <div className="export-controls">
          <input type="datetime-local" className="mini-date" value={exportStart} onChange={e => setExportStart(e.target.value)} />
          <span className="to-sep">à</span>
          <input type="datetime-local" className="mini-date" value={exportEnd} onChange={e => setExportEnd(e.target.value)} />
          <button className="btn btn-primary" onClick={downloadHistory}>Télécharger</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Splice</th>
            {detail.history.length > 0 && detail.history[0].Temperature !== undefined && <th>Température</th>}
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {detail.history.map((r, i) => (
            <tr key={i}>
              <td>{r.Date}</td>
              <td>{r.Time}</td>
              <td>{r.Splice}</td>
              {detail.history.length > 0 && detail.history[0].Temperature !== undefined && <td>{r.Temperature || "---"}</td>}
              <td>{r["Error-Text"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
