import React, { useState } from "react";
import NormalLoginPage from "./components/NormalLoginPage";
import RakListPage from "./components/RakListPage";
import ServerListPage from "./components/ServerListPage";
import AppListPage from "./components/AppListPage";
import AccessGateModal from "./components/AccessGateModal";

export default function App() {
  const [user, setUser] = useState(null);
  const [openedRak, setOpenedRak] = useState(null);
  const [openedServer, setOpenedServer] = useState(null);
  const [gate, setGate] = useState(null); // { type: 'rak' | 'server', item: {...} }

  if (!user) return <NormalLoginPage onLoginSuccess={setUser} />;

  // Level 3: sudah buka server tertentu -> tampilkan aplikasi
  if (openedServer) {
    return <AppListPage server={openedServer} onBack={() => setOpenedServer(null)} />;
  }

  // Level 2: sudah buka rak tertentu -> tampilkan daftar server di rak itu
  if (openedRak) {
    return (
      <>
        <ServerListPage
          rak={openedRak}
          onBack={() => setOpenedRak(null)}
          onOpenServer={(server) => setGate({ type: "server", item: server })}
        />
        {gate?.type === "server" && (
          <AccessGateModal
            target={gate.item}
            targetLabel="Server"
            onClose={() => setGate(null)}
            onSuccess={(server) => { setGate(null); setOpenedServer(server); }}
          />
        )}
      </>
    );
  }

  // Level 1: baru login -> tampilkan daftar rak
  return (
    <>
      <RakListPage
        user={user}
        onLogout={() => setUser(null)}
        onOpenRak={(rak) => setGate({ type: "rak", item: rak })}
      />
      {gate?.type === "rak" && (
        <AccessGateModal
          target={gate.item}
          targetLabel="Rak"
          onClose={() => setGate(null)}
          onSuccess={(rak) => { setGate(null); setOpenedRak(rak); }}
        />
      )}
    </>
  );
}