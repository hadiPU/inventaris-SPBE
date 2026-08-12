import React, { useState, useEffect } from "react";
import { Server, QrCode, ArrowLeft } from "lucide-react";
import { api } from "../api";

export default function ServerListPage({ rak, onBack, onOpenServer }) {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServersInRak(rak.id).then(setServers).catch(console.error).finally(() => setLoading(false));
  }, [rak]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-5xl mx-auto px-6 py-7">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-brand-dim hover:text-brand-text mb-4 cursor-pointer"><ArrowLeft size={15} /> Kembali ke Daftar Rak</button>

        <h1 className="text-xl font-bold mb-1">{rak.nama_rak}</h1>
        <p className="text-sm text-brand-dim mb-6">{rak.lokasi}</p>

        {loading ? (
          <p className="text-sm text-brand-dim">Memuat daftar server...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servers.map((s) => (
              <div key={s.id} className="bg-brand-panel border border-brand-border rounded-2xl p-5 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-brand-accent/15 flex items-center justify-center mb-3"><Server size={20} className="text-brand-accent" /></div>
                <h3 className="font-semibold text-sm mb-4">{s.nama_server}</h3>
                <button onClick={() => onOpenServer(s)} className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-accent/15 text-brand-accent font-semibold text-xs cursor-pointer hover:bg-brand-accent/25 transition">
                  <QrCode size={14} /> Buka Server Ini
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}