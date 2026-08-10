import React from "react";
import { X } from "lucide-react";

export default function AddAppModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
      <div className="bg-brand-panel border border-brand-border rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold m-0">Tambah Aplikasi</h3>
          <button onClick={onClose} className="text-brand-dim hover:text-brand-text cursor-pointer">
            <X size={18} />
          </button>
        </div>
        {/* TODO: sambungkan form ini ke state & backend setelah field final ditentukan pembimbing */}
        <p className="text-xs text-brand-dim mb-4">
          Form ini masih placeholder — field akan disesuaikan setelah arahan dari pembimbing lapangan.
        </p>
        <input placeholder="Nama aplikasi" className="w-full px-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text text-sm mb-2.5 outline-none" />
        <input placeholder="Bahasa pemrograman" className="w-full px-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text text-sm mb-2.5 outline-none" />
        <input placeholder="Sistem operasi" className="w-full px-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text text-sm mb-4 outline-none" />
        <button className="w-full py-3 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
          Simpan
        </button>
      </div>
    </div>
  );
}