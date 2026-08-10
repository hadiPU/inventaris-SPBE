import React from "react";
import { Server, QrCode, LogOut, MapPin } from "lucide-react";

export default function ServerListPage({ servers, user, onLogout, onScanServer }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-5xl mx-auto px-6 py-7">
        <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold m-0">Daftar Server</h1>
            <p className="text-sm text-brand-dim mt-0.5">Masuk sebagai: <strong>{user?.username}</strong></p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-brand-border bg-brand-panel text-brand-text text-sm cursor-pointer hover:bg-brand-border/30 transition">
            <LogOut size={14} /> Keluar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.map((s) => (
            <div key={s.kode_qr} className="bg-brand-panel border border-brand-border rounded-2xl p-5 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-brand-accent/15 flex items-center justify-center mb-3">
                <Server size={20} className="text-brand-accent" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{s.nama_server}</h3>
              <p className="text-xs text-brand-dim flex items-center gap-1 mb-4">
                <MapPin size={12} /> {s.lokasi}
              </p>
              <button
                onClick={() => onScanServer(s)}
                className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-accent/15 text-brand-accent font-semibold text-xs cursor-pointer hover:bg-brand-accent/25 transition"
              >
                <QrCode size={14} /> Scan untuk Lihat Isi
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}