import React, { useState } from "react";
import { QrCode, KeyRound, X, Smartphone, Laptop } from "lucide-react";

export default function AccessGateModal({ target, targetLabel, onClose, onSuccess }) {
  const [method, setMethod] = useState("scan"); // 'scan' (HP) atau 'manual' (laptop)
  const [step, setStep] = useState(1); // 1 = identifikasi, 2 = PIN
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleConfirmIdentity = (e) => {
    e.preventDefault();
    // TODO: kalau method === "scan", ganti dengan hasil scan kamera asli (html5-qrcode)
    // dan cocokkan hasil scan dengan target.kode_qr
    setStep(2);
  };

  const handleSubmitPin = (e) => {
    e.preventDefault();
    setError("");
    // TODO: ganti dengan verifikasi PIN asli ke backend
    if (pin.trim().length < 4) {
      setError("PIN tidak valid.");
      return;
    }
    onSuccess(target);
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

        <p className="text-xs text-brand-dim mb-1">Membuka {targetLabel}:</p>
        <h3 className="text-base font-bold mb-5">{target?.nama_rak || target?.nama_server}</h3>

        {step === 1 && (
          <form onSubmit={handleConfirmIdentity}>
            {/* Pilihan metode akses */}
            <div className="flex gap-2 mb-4 bg-brand-bg rounded-lg p-1 border border-brand-border">
              <button
                type="button"
                onClick={() => setMethod("scan")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold transition ${method === "scan" ? "bg-brand-accent text-white" : "text-brand-dim"}`}
              >
                <Smartphone size={13} /> Scan (HP)
              </button>
              <button
                type="button"
                onClick={() => setMethod("manual")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold transition ${method === "manual" ? "bg-brand-accent text-white" : "text-brand-dim"}`}
              >
                <Laptop size={13} /> Manual (Laptop)
              </button>
            </div>

            {method === "scan" ? (
              <>
                <div className="flex items-center gap-2 mb-1.5">
                  <QrCode size={18} className="text-brand-accent" />
                  <span className="text-sm font-semibold">Scan QR Fisik</span>
                </div>
                <p className="text-xs text-brand-dim mb-4">
                  Arahkan kamera HP ke QR yang tertempel fisik di {targetLabel.toLowerCase()} ini.
                </p>
                {/* TODO: ganti placeholder ini dengan komponen kamera asli (html5-qrcode) */}
                <div className="bg-brand-bg border border-dashed border-brand-border rounded-xl h-40 flex items-center justify-center mb-4">
                  <span className="text-xs text-brand-dim">[ Area kamera scan QR ]</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1.5">
                  <Laptop size={18} className="text-brand-accent" />
                  <span className="text-sm font-semibold">Konfirmasi Kode</span>
                </div>
                <p className="text-xs text-brand-dim mb-4">
                  Kode {targetLabel.toLowerCase()} yang dipilih:
                </p>
                <div className="bg-brand-bg border border-brand-border rounded-lg px-3.5 py-3 text-sm font-mono mb-4">
                  {target?.kode_qr}
                </div>
              </>
            )}

            <button type="submit" className="w-full py-3 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
              Lanjut
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitPin}>
            <div className="flex items-center gap-2 mb-1.5">
              <KeyRound size={18} className="text-brand-accent" />
              <span className="text-sm font-semibold">Masukkan PIN</span>
            </div>
            <p className="text-xs text-brand-dim mb-4">PIN akses untuk {targetLabel.toLowerCase()} ini.</p>

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
                Buka
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}