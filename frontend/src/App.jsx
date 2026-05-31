import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchPostes, fetchPosteDetail, fetchAlerts, tickAll, logout } from "./api";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import MonitoringView from "./components/MonitoringView";
import DashboardView from "./components/DashboardView";
import MaintenanceView from "./components/MaintenanceView";
import LoginModal from "./components/LoginModal";

function toLocalInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [showLogin, setShowLogin] = useState(false);
  
  const [view, setView] = useState("monitoring");
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("authUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  const [postes, setPostes] = useState([]);
  const [selectedPosteId, setSelectedPosteId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [globalTime, setGlobalTime] = useState("");

  // Sidebar shared states
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");
  const [jumpTime, setJumpTime] = useState("");

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const refreshPostes = async () => setPostes(await fetchPostes());
  const refreshAlerts = async () => setAlerts(await fetchAlerts());
  const refreshDetail = async (id) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      const data = await fetchPosteDetail(id);
      setDetail(data);
      return data;
    } catch (err) {
      setDetail(null);
      setDetailError(err.message || "Impossible de charger ce poste");
      return null;
    } finally {
      setDetailLoading(false);
    }
  };

  const handleRefreshAll = async () => {
    try {
      await tickAll();
    } catch {
      // Keep UI responsive even if tick fails
    }
    await refreshPostes();
    if (selectedPosteId) await refreshDetail(selectedPosteId);
    if (view === "maintenance") await refreshAlerts();
  };

  useEffect(() => {
    refreshPostes();
    const id = setInterval(handleRefreshAll, 1000);
    return () => clearInterval(id);
  }, [selectedPosteId, view]);

  useEffect(() => {
    if (detail && selectedPosteId) {
      if (!filterStart) setFilterStart(toLocalInputValue(detail.filterStart));
      if (!filterEnd) setFilterEnd(toLocalInputValue(detail.filterEnd));
    }
  }, [selectedPosteId, detail]);

  const handleSelectPoste = async (id) => {
    setSelectedPosteId(id);
    setDetail(null);
    setDetailError(null);
    setFilterStart("");
    setFilterEnd("");
    setJumpTime("");
    await refreshDetail(id);
  };

  const handleBackToOverview = () => {
    setSelectedPosteId(null);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(false);
  };

  const selectedPoste = postes.find((p) => p.id === selectedPosteId);
  const detailTitle = selectedPosteId
    ? (detail?.name || selectedPoste?.name || "Poste")
    : view === "monitoring"
      ? "Monitoring Overview"
      : "Maintenance Alerts";

  return (
    <div className="main-wrapper">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        user={user} 
        onLoginClick={() => setShowLogin(true)} 
        onLogout={async () => {
          if (user) await logout(user);
          setUser(null);
        }} 
      />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/dashboard" element={
          <div className="app">
            <Sidebar 
              view={view} 
              setView={setView} 
              user={user} 
              setUser={setUser} 
              selected={selectedPosteId}
              detail={detail}
              onRefresh={handleRefreshAll}
              filterStart={filterStart}
              setFilterStart={setFilterStart}
              filterEnd={filterEnd}
              setFilterEnd={setFilterEnd}
              jumpTime={jumpTime}
              setJumpTime={setJumpTime}
            />
            <main className="content">
              <TopBar 
                globalTime={globalTime} 
                setGlobalTime={setGlobalTime} 
                onRefresh={handleRefreshAll} 
                title={detailTitle}
              />
              <div className="content-inner">
                {selectedPosteId ? (
                  <DashboardView 
                    detail={detail}
                    loading={detailLoading}
                    error={detailError}
                    selected={selectedPosteId} 
                    onBack={handleBackToOverview}
                  />
                ) : (
                  view === "monitoring" ? (
                    <MonitoringView postes={postes} onSelect={handleSelectPoste} onRefresh={refreshPostes} />
                  ) : (
                    <MaintenanceView user={user} onLogin={setUser} alerts={alerts} onRefresh={refreshAlerts} />
                  )
                )}
              </div>
            </main>
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={setUser} />}
    </div>
  );
}
