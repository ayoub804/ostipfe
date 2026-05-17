import AuthForm from "./AuthForm";
import ComputerIcon from "./ComputerIcon";
import { claimAlert, fixAlert } from "../api";

export default function MaintenanceView({ user, onLogin, alerts, onRefresh }) {
  if (!user) return <AuthForm onLogin={onLogin} />;

  async function handleClaim(id) { await claimAlert(id, user); onRefresh(); }
  async function handleFix(id) { await fixAlert(id, user); onRefresh(); }

  const badgeLabel = { pending: "EN ATTENTE", claimed: "EN COURS", fixed: "RÉPARÉ" };

  return (
    <div>
      <h1 className="page-title">Tableau de bord Maintenance</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: 20 }}>Bienvenue, <strong style={{ color: "var(--text)" }}>{user}</strong>. Voici les alertes en cours.</p>
      <div className="alerts-grid">
        {alerts.length === 0 ? (
          <div className="no-alerts">Aucune défaillance technique détectée.</div>
        ) : alerts.map(a => (
          <div key={a.id} className={`alert-card ${a.status}`}>
            <div className="alert-header">
              <span className="machine-name"><ComputerIcon className="alert-pc-icon" />{a.poste_name}</span>
              <span className={`alert-badge ${a.status}`}>{badgeLabel[a.status]}</span>
            </div>
            <div className="alert-body">
              <p className="alert-error"><strong>Défaillance :</strong> {a.error_text}</p>
              <p>Depuis : {new Date(a.start_time).toLocaleTimeString()}</p>
              {a.claimed_by && <p>Pris en charge par : {a.claimed_by}</p>}
            </div>
            <div>
              {a.status === "pending" && <button className="btn btn-primary btn-full" onClick={() => handleClaim(a.id)}>Je vais le réparer</button>}
              {a.status === "claimed" && a.claimed_by === user && <button className="btn-success" onClick={() => handleFix(a.id)}>Marquer comme réparé</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
