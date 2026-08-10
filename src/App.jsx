import React, { useState } from "react";
import NormalLoginPage from "./components/NormalLoginPage";
import ServerListPage from "./components/ServerListPage";
import ScanAccessModal from "./components/ScanAccessModal";
import Dashboard from "./components/Dashboard"; 
import { DUMMY_SERVERS } from "./data/dummyData";

export default function App() {
  const [user, setUser] = useState(null);
  const [scanningServer, setScanningServer] = useState(null); 
  const [openedServer, setOpenedServer] = useState(null); 

  // Tahap 1: login
  if (!user) {
    return <NormalLoginPage onLoginSuccess={setUser} />;
  }

  // Tahap 3: berhasil scan QR+PIN salah satu server -> tampilkan isinya
  if (openedServer) {
    return (
      <Dashboard
        server={openedServer}
        onLogout={() => setOpenedServer(null)} 
      />
    );
  }

  // Tahap 2: sudah login -> tampilkan daftar server
  return (
    <>
      <ServerListPage
        servers={DUMMY_SERVERS}
        user={user}
        onLogout={() => setUser(null)}
        onScanServer={setScanningServer}
      />
      {scanningServer && (
        <ScanAccessModal
          server={scanningServer}
          onClose={() => setScanningServer(null)}
          onSuccess={(server) => {
            setScanningServer(null);
            setOpenedServer(server);
          }}
        />
      )}
    </>
  );
}