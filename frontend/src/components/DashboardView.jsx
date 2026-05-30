import { useMemo, useState } from "react";
import ComputerIcon from "./ComputerIcon";
import ShiftChart from "./ShiftChart";
import TemperatureGraph from "./TemperatureGraph";
import { exportHistoryUrl } from "../api";

export default function DashboardView({ detail, selected, onBack }) {
  const [spliceSearch, setSpliceSearch] = useState("");
  const [exportStart, setExportStart] = useState("");
  const [exportEnd, setExportEnd] = useState("");

  const shiftFilterRows = useMemo(() => {
    if (!detail) return [];
    const sf = detail.shiftFilter || {};
    return [
      { label: "Équipe 1 (06:00-14:30)", value: sf.shift1 || 0 },
      { label: "Équipe 2 (14:30-22:00)", value: sf.shift2 || 0 },
      { label: "Équipe 3 (22:00-06:00)", value: sf.shift3 || 0 },
    ];
  }, [detail]);

  if (!detail) return null;

  function downloadHistory() {
    if (!exportStart || !exportEnd) { alert("Veuillez sélectionner une plage de dates."); return; }
    window.open(exportHistoryUrl(selected, exportStart, exportEnd), "_blank");
  }

  const safeDetail = {
    ...detail,
    statusColor: detail.statusColor || "gray",
    statusText: detail.statusText || "---",
    totalFiltered: detail.totalFiltered || 0,
    totalToday: detail.totalToday || 0,
    totalShift: detail.totalShift || 0,
    spliceCurrent: detail.spliceCurrent || "---",
    shiftDay: detail.shiftDay || { shift1: 0, shift2: 0, shift3: 0, total: 0, date: "" },
    shiftHistory: detail.shiftHistory || [],
    temperatureHistory: detail.temperatureHistory || [],
    breakdown: detail.breakdown || [],
    history: detail.history || []
  };

  const hasTemperatureColumn = safeDetail.history.length > 0 && safeDetail.history[0].temperature !== undefined;

  return (
    <div>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 16 }}>← Retour à l'accueil</button>
      <h1 className="page-title">Suivi — {safeDetail.name}</h1>

      <div className="kpi-row">
        <div className={`big-status ${safeDetail.statusColor}`}>
          <ComputerIcon className="pc-icon" />
        </div>
        <div className="shift-circle">
          <div>Équipe</div>
          <strong>{safeDetail.totalShift}</strong>
          <small>Pièces</small>
        </div>
        {safeDetail.temperature !== undefined && (
          <div className={`shift-circle temp-${safeDetail.temperatureColor || "gray"}`}>
            <div>Temp</div>
            <strong className="temp-value">{safeDetail.temperature}</strong>
          </div>
        )}
        <div className="meta-info">
          <div>Statut : <span>{safeDetail.statusText}</span></div>
          <div>Temps simulé : <span>{safeDetail.currentSimTime ? new Date(safeDetail.currentSimTime).toLocaleString() : "---"}</span></div>
          <div>Dernière activité : <span>{safeDetail.lastActivity || "---"}</span></div>
        </div>
      </div>

      <div className="metrics">
        <div className="metric">Total filtré<div className="metric-val">{safeDetail.totalFiltered}</div></div>
        <div className="metric">Aujourd'hui<div className="metric-val">{safeDetail.totalToday}</div></div>
        <div className="metric">Splice actuel<div className="metric-val">{safeDetail.spliceCurrent}</div></div>
      </div>

      <h3 style={{ marginBottom: 8 }}>Équipes — Jour simulé</h3>
      <table>
        <tbody>
          <tr><td>Équipe 1 (06:00-14:30)</td><td>{safeDetail.shiftDay.shift1}</td></tr>
          <tr><td>Équipe 2 (14:30-22:00)</td><td>{safeDetail.shiftDay.shift2}</td></tr>
          <tr><td>Équipe 3 (22:00-06:00)</td><td>{safeDetail.shiftDay.shift3}</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>{safeDetail.shiftDay.total}</strong></td></tr>
        </tbody>
      </table>

      <h3 style={{ marginBottom: 8 }}>Équipes — Filtre</h3>
      <table>
        <tbody>
          {shiftFilterRows.map(r => <tr key={r.label}><td>{r.label}</td><td>{r.value}</td></tr>)}
        </tbody>
      </table>

      <ShiftChart shiftHistory={safeDetail.shiftHistory} />

      <TemperatureGraph data={safeDetail.temperatureHistory} />

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
          {safeDetail.breakdown.filter(r => (r.name || "").toLowerCase().includes((spliceSearch || "").toLowerCase())).map((r, i) => (
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
            <th>Heure</th>
            <th>Splice</th>
            {hasTemperatureColumn && <th>Température</th>}
            <th>Erreur</th>
          </tr>
        </thead>
        <tbody>
          {safeDetail.history.map((r, i) => (
            <tr key={i}>
              <td>{r.Date}</td>
              <td>{r.Time}</td>
              <td>{r.Splice}</td>
              {hasTemperatureColumn && <td>{r.temperature || "---"}</td>}
              <td>{r["Error-Text"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}