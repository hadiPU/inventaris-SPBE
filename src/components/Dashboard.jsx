import React, { useState, useMemo } from "react";
import { Code2, Monitor, LogOut, Search, Plus, Server } from "lucide-react";
import { DUMMY_APPS } from "../data/dummyData";
import AddAppModal from "./AddAppModal";

export default function Dashboard({ server, onLogout }) {
  
  const appsInThisServer = useMemo(
    () => DUMMY_APPS.filter((a) => a.server === server?.kode_qr),
    [server]
  );

  const [filterBahasa, setFilterBahasa] = useState("Semua");
  const [filterOs, setFilterOs] = useState("Semua");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const bahasaList = ["Semua", ...new Set(appsInThisServer.map((a) => a.bahasa))];
  const osList = ["Semua", ...new Set(appsInThisServer.map((a) => a.os))];

  const filteredApps = useMemo(() => {
    return appsInThisServer.filter((a) => {
      const matchBahasa = filterBahasa === "Semua" || a.bahasa === filterBahasa;
      const matchOs = filterOs === "Semua" || a.os === filterOs;
      const matchSearch = a.nama_aplikasi.toLowerCase().includes(search.toLowerCase());
      return matchBahasa && matchOs && matchSearch;
    });
  }, [appsInThisServer, filterBahasa, filterOs, search]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-5xl mx-auto px-6 py-7">

        {/* Header khusus nunjukin server mana yang lagi dibuka */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-accent/15 flex items-center justify-center">
              <Server size={20} className="text-brand-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold m-0">{server?.nama_server}</h1>
              <p className="text-sm text-brand-dim mt-0.5">
                {server?.lokasi} · Kode QR: {server?.kode_qr}
              </p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-brand-border bg-brand-panel text-brand-text text-sm cursor-pointer hover:bg-brand-border/30 transition">
            <LogOut size={14} /> Keluar / Scan Server Lain
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3.5 mb-5">
          <div className="bg-brand-panel border border-brand-border rounded-2xl p-4.5">
            <div className="text-xs text-brand-dim mb-1.5">Total Aplikasi di Server Ini</div>
            <div className="text-2xl font-bold">{appsInThisServer.length}</div>
          </div>
          <div className="bg-brand-panel border border-brand-border rounded-2xl p-4.5">
            <div className="text-xs text-brand-dim mb-1.5">Jenis Bahasa Pemrograman</div>
            <div className="text-2xl font-bold">{bahasaList.length - 1}</div>
          </div>
          <div className="bg-brand-panel border border-brand-border rounded-2xl p-4.5">
            <div className="text-xs text-brand-dim mb-1.5">Jenis Sistem Operasi</div>
            <div className="text-2xl font-bold">{osList.length - 1}</div>
          </div>
        </div>

        <div className="flex gap-2.5 mb-4 flex-wrap items-center">
          <div className="flex items-center gap-2 bg-brand-panel border border-brand-border rounded-lg px-3 py-2 flex-1 min-w-[200px]">
            <Search size={14} className="text-brand-dim" />
            <input
              placeholder="Cari nama aplikasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-transparent outline-none text-brand-text text-sm w-full"
            />
          </div>

          <select value={filterBahasa} onChange={(e) => setFilterBahasa(e.target.value)} className="px-3 py-2.5 rounded-lg border border-brand-border bg-brand-panel text-brand-text text-sm">
            {bahasaList.map((b) => <option key={b} value={b}>{b === "Semua" ? "Semua Bahasa" : b}</option>)}
          </select>

          <select value={filterOs} onChange={(e) => setFilterOs(e.target.value)} className="px-3 py-2.5 rounded-lg border border-brand-border bg-brand-panel text-brand-text text-sm">
            {osList.map((o) => <option key={o} value={o}>{o === "Semua" ? "Semua OS" : o}</option>)}
          </select>

          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
            <Plus size={15} /> Tambah Aplikasi
          </button>
        </div>

        <div className="bg-brand-panel border border-brand-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-4.5 py-3 text-xs text-brand-dim font-semibold border-b border-brand-border">
            <span>NAMA APLIKASI</span>
            <span>BAHASA</span>
            <span>OS</span>
            <span>OPD</span>
            <span>STATUS</span>
          </div>
          {filteredApps.length === 0 ? (
            <div className="p-8 text-center text-sm text-brand-dim">Belum ada aplikasi tercatat di server ini.</div>
          ) : (
            filteredApps.map((a) => (
              <div key={a.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-4.5 py-3.5 text-sm border-b border-brand-border items-center last:border-b-0">
                <span className="font-medium">{a.nama_aplikasi}</span>
                <span className="flex items-center gap-1.5 text-brand-dim"><Code2 size={13} /> {a.bahasa}</span>
                <span className="flex items-center gap-1.5 text-brand-dim"><Monitor size={13} /> {a.os}</span>
                <span className="text-brand-dim">{a.opd}</span>
                <span className={`text-xs font-semibold ${a.status === "Aktif" ? "text-brand-green" : "text-brand-red"}`}>{a.status}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && <AddAppModal onClose={() => setShowModal(false)} server={server} />}
    </div>
  );
}