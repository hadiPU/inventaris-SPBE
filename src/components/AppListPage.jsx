import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, Plus, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { api } from "../api";
import AddAppModal from "./AddAppModal";

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-brand-dim mb-0.5">{label}</p>
      <p className="text-sm">{value || "-"}</p>
    </div>
  );
}

export default function AppListPage({ server, onBack }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const loadApps = () => {
    setLoading(true);
    api.getAppsInServer(server.id).then(setApps).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(loadApps, [server]);

  const filteredApps = apps.filter((a) => a.sistem?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="max-w-5xl mx-auto px-6 py-7">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-brand-dim hover:text-brand-text mb-4 cursor-pointer"><ArrowLeft size={15} /> Kembali ke Daftar Server</button>

        <h1 className="text-xl font-bold mb-1">{server?.nama_server}</h1>
        <p className="text-sm text-brand-dim mb-6">{apps.length} aplikasi terpasang</p>

        <div className="flex gap-2.5 mb-4 flex-wrap items-center">
          <div className="flex items-center gap-2 bg-brand-panel border border-brand-border rounded-lg px-3 py-2 flex-1 min-w-[200px]">
            <Search size={14} className="text-brand-dim" />
            <input placeholder="Cari nama aplikasi..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-none bg-transparent outline-none text-brand-text text-sm w-full" />
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
            <Plus size={15} /> Tambah Aplikasi
          </button>
        </div>

        <div className="bg-brand-panel border border-brand-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] px-4.5 py-3 text-xs text-brand-dim font-semibold border-b border-brand-border">
            <span>NAMA SISTEM</span><span>OPD</span><span>KATEGORI</span><span>BAHASA</span><span>STATUS</span><span></span>
          </div>
          {loading ? (
            <div className="p-8 text-center text-sm text-brand-dim">Memuat data...</div>
          ) : filteredApps.length === 0 ? (
            <div className="p-8 text-center text-sm text-brand-dim">Belum ada aplikasi tercatat di server ini.</div>
          ) : (
            filteredApps.map((a) => {
              const isOpen = expandedId === a.id;
              return (
                <div key={a.id} className="border-b border-brand-border last:border-b-0">
                  <div
                    onClick={() => setExpandedId(isOpen ? null : a.id)}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] px-4.5 py-3.5 text-sm items-center cursor-pointer hover:bg-brand-border/10 transition"
                  >
                    <div>
                      <span className="font-medium block">{a.sistem}</span>
                      {a.alamat && <span className="text-xs text-brand-dim flex items-center gap-1 mt-0.5"><Globe size={11} /> {a.alamat}</span>}
                    </div>
                    <span className="text-brand-dim">{a.nama_opd || "-"}</span>
                    <span className="text-brand-dim">{a.nama_kategori || "-"}</span>
                    <span className="text-brand-dim">{a.nama_bahasa ? `${a.nama_bahasa} ${a.versi_bahasa || ""}` : "-"}</span>
                    <span className={`text-xs font-semibold ${a.nama_status?.toLowerCase() === "aktif" ? "text-brand-green" : "text-brand-red"}`}>{a.nama_status || "-"}</span>
                    <span className="text-brand-dim">{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                  </div>

                  {isOpen && (
                    <div className="px-4.5 pb-5 pt-1 bg-brand-bg/40">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 border-t border-brand-border pt-4">
                        <DetailRow label="Jenis Layanan" value={a.jenis_layanan} />
                        <DetailRow label="Developer" value={a.nama_developer} />
                        <DetailRow label="Platform" value={a.nama_platform} />
                        <DetailRow label="Secure" value={a.secure} />
                        <DetailRow label="Enkripsi" value={a.enkripsi_list} />
                        <DetailRow label="Integrasi" value={a.nama_integrasi} />
                        <DetailRow label="Data Integrasi" value={a.nama_data} />
                        <DetailRow label="Keterangan (Ket)" value={a.nama_ket} />
                        <DetailRow label="Keterangan Migrasi" value={a.keterangan_migrasi} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      {showModal && <AddAppModal server={server} onClose={() => setShowModal(false)} onSaved={loadApps} />}
    </div>
  );
}