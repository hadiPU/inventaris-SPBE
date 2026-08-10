import React, { useState, useMemo } from "react";
import { Code2, Monitor, ArrowLeft, Search, Plus } from "lucide-react";
import { DUMMY_APPS } from "../data/dummyData";
import AddAppModal from "./AddAppModal";

export default function AppListPage({ server, onBack }) {
  const appsInThisServer = useMemo(() => DUMMY_APPS.filter((a) => a.server === server?.kode_qr), [server]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredApps = appsInThisServer.filter((a) => a.nama_aplikasi.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-5xl mx-auto px-6 py-7">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-brand-dim hover:text-brand-text mb-4 cursor-pointer">
          <ArrowLeft size={15} /> Kembali ke Daftar Server
        </button>

        <h1 className="text-xl font-bold mb-1">{server?.nama_server}</h1>
        <p className="text-sm text-brand-dim mb-6">{appsInThisServer.length} aplikasi terpasang</p>

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
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
            <Plus size={15} /> Tambah Aplikasi
          </button>
        </div>

        <div className="bg-brand-panel border border-brand-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-4.5 py-3 text-xs text-brand-dim font-semibold border-b border-brand-border">
            <span>NAMA APLIKASI</span><span>BAHASA</span><span>OS</span><span>OPD</span><span>STATUS</span>
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