import { useState } from "react";
import MachineCard from "./MachineCard";
import AddPosteModal from "./AddPosteModal";

export default function MonitoringView({ postes, onSelect, onRefresh }) {
  const [adding, setAdding] = useState(false);

  return (
    <>
      <h1 className="page-title">Monitoring — Postes de production</h1>
      {adding && <AddPosteModal onClose={() => setAdding(false)} onCreated={onRefresh} />}
      <div className="machine-grid">
        {postes.map(p => (
          <MachineCard key={p.id} poste={p} onClick={() => onSelect(p.id)} onRefresh={onRefresh} />
        ))}
        <div className="poste-wrap">
          <div className="add-card" onClick={() => setAdding(true)}>
            <span className="add-icon">+</span>
            <span className="add-text">Nouveau Poste</span>
          </div>
        </div>
      </div>
    </>
  );
}
