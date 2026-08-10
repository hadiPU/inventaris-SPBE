import React, { useState, useMemo } from "react";
import { Boxes, QrCode, LogOut, MapPin, Search, X } from "lucide-react";
import { DUMMY_APPS, DUMMY_SERVERS, DUMMY_RAKS } from "../data/dummyData";

export default function RakListPage({ user, onLogout, onOpenRak }) {
  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    return DUMMY_APPS.filter((a) => a.nama_aplikasi.toLowerCase().includes(search.toLowerCase()))
      .map((a) => {
        const server = DUMMY_SERVERS.find((s) => s.kode_qr === a.server);
        const rak = DUMMY_RAKS.find((r) => r.kode_qr === server?.rak);
        return { ...a, serverInfo: server, rakInfo: rak };
      });
  }, [search]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-5xl mx-auto px-6 py-7">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold m-0">Daftar Rak Server</h1>
            <p className="text-sm text-brand-dim mt-0.5">Masuk sebagai: <strong>{user?.username}</strong></p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-brand-border bg-brand-panel text-brand-text text-sm cursor-pointer hover:bg-brand-border/30 transition">
            <LogOut size={14} /> Keluar
          </button>
        </div>

        {/* Search aplikasi global */}
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-brand-panel border border-brand-border rounded-lg px-3.5 py-3 mb-3">
            <Search size={15} className="text-brand-dim" />
            <input
              placeholder="Cari nama aplikasi di seluruh rak & server..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-brand-text"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-brand-dim hover:text-brand-text">
                <X size={14} />
              </button>
            )}
          </div>

          {search.trim() && (
            <div className="bg-brand-panel border border-brand-border rounded-xl overflow-hidden">
              {searchResults.length === 0 ? (
                <div className="p-5 text-center text-sm text-brand-dim">Aplikasi tidak ditemukan.</div>
              ) : (
                searchResults.map((r) => (
                  <div key={r.id} className="px-4 py-3.5 border-b border-brand-border last:border-b-0">
                    <p className="font-medium text-sm mb-1.5">{r.nama_aplikasi}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-dim">
                      <span>Rak: <strong className="text-brand-text">{r.rakInfo?.nama_rak}</strong></span>
                      <span>Server: <strong className="text-brand-text">{r.serverInfo?.nama_server}</strong></span>
                      <span>OPD: <strong className="text-brand-text">{r.opd}</strong></span>
                      <span>Bahasa: <strong className="text-brand-text">{r.bahasa}</strong></span>
                      <span>OS: <strong className="text-brand-text">{r.os}</strong></span>
                      <span className={r.status === "Aktif" ? "text-brand-green" : "text-brand-red"}>{r.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Kartu rak */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DUMMY_RAKS.map((r) => (
            <div key={r.kode_qr} className="bg-brand-panel border border-brand-border rounded-2xl p-5 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-brand-accent/15 flex items-center justify-center mb-3">
                <Boxes size={20} className="text-brand-accent" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{r.nama_rak}</h3>
              <p className="text-xs text-brand-dim flex items-center gap-1 mb-4">
                <MapPin size={12} /> {r.lokasi}
              </p>
              <button
                onClick={() => onOpenRak(r)}
                className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-accent/15 text-brand-accent font-semibold text-xs cursor-pointer hover:bg-brand-accent/25 transition"
              >
                <QrCode size={14} /> Buka Rak Ini
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}