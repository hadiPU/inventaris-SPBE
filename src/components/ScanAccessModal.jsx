import React, { useState } from "react";
import { QrCode, KeyRound, X } from "lucide-react";

export default function ScanAccessModal({ server, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1 = konfirmasi scan, 2 = input PIN
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleConfirmScan = (e) => {
    e.preventDefault();
    
    setStep(2);
  };

  const handleSubmitPin = (e) => {
    e.preventDefault();
    setError("");

    if (pin.trim().length < 4) {
      setError("PIN tidak valid.");
      return;
    }
    onSuccess(server);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5 z-50">
      <div className="bg-brand-panel border border-brand-border rounded-2xl p-7 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-dim hover:text-brand-text cursor-pointer">
          <X size={18} />
        </button>

        <div className="flex gap-2 mb-5">
          <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-brand-accent" : "bg-brand-border"}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-brand-accent" : "bg-brand-border"}`} />
        </div>

        <p className="text-xs text-brand-dim mb-1">Membuka data untuk:</p>
        <h3 className="text-base font-bold mb-5">{server?.nama_server}</h3>

        {step === 1 && (
          <form onSubmit={handleConfirmScan}>
            <div className="flex items-center gap-2 mb-1.5">
              <QrCode size={18} className="text-brand-accent" />
              <span className="text-sm font-semibold">Scan QR di Server Ini</span>
            </div>
            <p className="text-xs text-brand-dim mb-4">
              Arahkan kamera ke QR yang tertempel fisik di server "{server?.nama_server}".
            </p>

            {/* TODO: ganti placeholder ini dengan komponen kamera asli */}
            <div className="bg-brand-bg border border-dashed border-brand-border rounded-xl h-40 flex items-center justify-center mb-4">
              <span className="text-xs text-brand-dim">[ Area kamera scan QR ]</span>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
              Sudah Scan, Lanjut
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitPin}>
            <div className="flex items-center gap-2 mb-1.5">
              <KeyRound size={18} className="text-brand-accent" />
              <span className="text-sm font-semibold">Masukkan PIN</span>
            </div>
            <p className="text-xs text-brand-dim mb-4">PIN akses untuk server ini.</p>

            <input
              type="password"
              inputMode="numeric"
              placeholder="Masukkan PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3.5 py-3 rounded-lg border border-brand-border bg-brand-bg text-brand-text text-sm mb-3 outline-none tracking-widest"
              autoFocus
            />

            {error && <p className="text-brand-red text-xs mb-3">{error}</p>}

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-lg border border-brand-border bg-transparent text-brand-text font-semibold text-sm cursor-pointer hover:bg-brand-border/30 transition">
                Kembali
              </button>
              <button type="submit" className="flex-[2] py-3 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
                Buka Data
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}