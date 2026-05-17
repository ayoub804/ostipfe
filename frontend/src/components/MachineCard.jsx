import ComputerIcon from "./ComputerIcon";
import { deletePoste, appendFiles } from "../api";

export default function MachineCard({ poste, onClick, onRefresh }) {
  async function handleDelete(e) {
    e.stopPropagation();
    await deletePoste(poste.id);
    onRefresh();
  }

  async function handleAppend(e) {
    e.stopPropagation();
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    await appendFiles(poste.id, files);
    onRefresh();
  }

  return (
    <div className="poste-wrap">
      <div className={`machine-card ${poste.statusColor}`} onClick={onClick}>
        <ComputerIcon className="pc-icon" />
      </div>
      <div className="poste-name">{poste.name}</div>
      <div className="poste-status">{poste.statusText}</div>
      <div className="poste-actions">
        <button className="btn-danger" onClick={handleDelete}>Supprimer</button>
        <label className="add-files-label" onClick={e => e.stopPropagation()}>
          + Excel
          <input type="file" multiple accept=".xlsx" style={{ display: "none" }} onChange={handleAppend} />
        </label>
      </div>
    </div>
  );
}
