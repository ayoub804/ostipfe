import { useState } from "react";
import { createPoste } from "../api";

export default function AddPosteModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || files.length === 0) return;
    try {
      await createPoste(name, files);
      onCreated();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Nouveau poste de production</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du poste</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Poste 1" required />
          </div>
          <div className="form-group">
            <label>Données Excel</label>
            <input type="file" multiple accept=".xlsx" onChange={e => setFiles(Array.from(e.target.files || []))} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary">Ajouter le poste</button>
          </div>
        </form>
      </div>
    </div>
  );
}
