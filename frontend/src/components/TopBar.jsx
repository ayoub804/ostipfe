import { jumpAll } from "../api";
import { CalendarSync } from "lucide-react";

export default function TopBar({ globalTime, setGlobalTime, onRefresh, title }) {
  async function handleSync() {
    if (!globalTime) return;
    await jumpAll(globalTime);
    onRefresh();
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-view-title">{title || "Dashboard Overview"}</h2>
      </div>
      <div className="topbar-sync">
        <input type="datetime-local" value={globalTime} onChange={e => setGlobalTime(e.target.value)} title="Global Time Sync" />
        <button className="btn btn-primary btn-sm" onClick={handleSync}>
          <CalendarSync size={16} />
          <span>Synchroniser</span>
        </button>
      </div>
    </div>
  );
}
