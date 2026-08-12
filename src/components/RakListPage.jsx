import React, { useState, useEffect, useCallback } from "react";
import { Boxes, QrCode, LogOut, MapPin, Search, X } from "lucide-react";
import { api } from "../api";

export default function RakListPage({ user, onLogout, onOpenRak }) {
  const [raks, setRaks] = useState([]);
  const [loadingRaks, setLoadingRaks] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    api.getRaks().then(setRaks).catch(console.error).finally(() => setLoadingRaks(false));
  }, []);

  const doSearch = useCallback((q) => {
    if (!q.trim()) { setSearchResults([]); return; }
    setSearching(true);
    api.searchApps(q).then(setSearchResults).catch(console.error).finally(() => setSearching(false));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => doSearch(search), 400); // debounce biar nggak spam request tiap ketikan
    return () => clearTimeout(t);
  }, [search, doSearch]);

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

        <div className="mb-6">
          <div className="flex items-center gap-2 bg-brand-panel border border-brand-border rounded-lg px-3.5 py-3 mb-3">
            <Search size={15} className="text-brand-dim" />
            <input placeholder="Cari nama aplikasi di seluruh rak & server..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none text-sm w-full text-brand-text" />
            {search && <button onClick={() => setSearch("")} className="text-brand-dim hover:text-brand-text"><X size={14} /></button>}
          </div>

          {search.trim() && (
            <div className="bg-brand-panel border border-brand-border rounded-xl overflow-hidden">
              {searching ? (
                <div className="p-5 text-center text-sm text-brand-dim">Mencari...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-5 text-center text-sm text-brand-dim">Aplikasi tidak ditemukan.</div>
              ) : (
                searchResults.map((r) => (
                  <div key={r.id} className="px-4 py-3.5 border-b border-brand-border last:border-b-0">
                    <p className="font-medium text-sm mb-1.5">{r.sistem}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-dim">
                      <span>Rak: <strong className="text-brand-text">{r.nama_rak}</strong></span>
                      <span>Server: <strong className="text-brand-text">{r.nama_server}</strong></span>
                      <span>OPD: <strong className="text-brand-text">{r.nama_opd || "-"}</strong></span>
                      <span>Bahasa: <strong className="text-brand-text">{r.nama_bahasa || "-"} {r.versi_bahasa || ""}</strong></span>
                      <span>Status: <strong className="text-brand-text">{r.nama_status || "-"}</strong></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {loadingRaks ? (
          <p className="text-sm text-brand-dim">Memuat daftar rak...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {raks.map((r) => (
              <div key={r.id} className="bg-brand-panel border border-brand-border rounded-2xl p-5 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-brand-accent/15 flex items-center justify-center mb-3"><Boxes size={20} className="text-brand-accent" /></div>
                <h3 className="font-semibold text-sm mb-1">{r.nama_rak}</h3>
                <p className="text-xs text-brand-dim flex items-center gap-1 mb-4"><MapPin size={12} /> {r.lokasi}</p>
                <button onClick={() => onOpenRak(r)} className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-accent/15 text-brand-accent font-semibold text-xs cursor-pointer hover:bg-brand-accent/25 transition">
                  <QrCode size={14} /> Buka Rak Ini
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}