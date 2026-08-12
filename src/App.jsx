import React, { useState } from "react";
import NormalLoginPage from "./components/NormalLoginPage";
import RakListPage from "./components/RakListPage";
import ServerListPage from "./components/ServerListPage";
import AppListPage from "./components/AppListPage";
import AccessGateModal from "./components/AccessGateModal";
import { getToken, clearToken } from "./api";

export default function App() {
  const [user, setUser] = useState(() => (getToken() ? { username: "admin" } : null)); // TODO: bisa disempurnakan validasi token-nya
  const [openedRak, setOpenedRak] = useState(null);
  const [openedServer, setOpenedServer] = useState(null);
  const [gate, setGate] = useState(null);

  const handleLogout = () => {
    clearToken();
    setUser(null);
    setOpenedRak(null);
    setOpenedServer(null);
  };

  if (!user) return <NormalLoginPage onLoginSuccess={setUser} />;

  if (openedServer) {
    return <AppListPage server={openedServer} onBack={() => setOpenedServer(null)} />;
  }

  if (openedRak) {
    return (
      <>
        <ServerListPage rak={openedRak} onBack={() => setOpenedRak(null)} onOpenServer={(server) => setGate({ type: "server", item: server })} />
        {gate?.type === "server" && (
          <AccessGateModal target={gate.item} targetType="server" targetLabel="Server" onClose={() => setGate(null)} onSuccess={(server) => { setGate(null); setOpenedServer(server); }} />
        )}
      </>
    );
  }

  return (
    <>
      <RakListPage user={user} onLogout={handleLogout} onOpenRak={(rak) => setGate({ type: "rak", item: rak })} />
      {gate?.type === "rak" && (
        <AccessGateModal target={gate.item} targetType="rak" targetLabel="Rak" onClose={() => setGate(null)} onSuccess={(rak) => { setGate(null); setOpenedRak(rak); }} />
      )}
    </>
  );
}