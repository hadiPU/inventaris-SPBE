import React, { useState } from "react";
import { QrCode, KeyRound, Server } from "lucide-react";
import { DUMMY_SERVERS } from "../data/dummyData";

export default function LoginPage({ onLoginSuccess }) {
  const [step, setStep] = useState(1);
  const [qrCode, setQrCode] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [matchedServer, setMatchedServer] = useState(null);

  const handleSubmitQr = (e) => {
    e.preventDefault();
    setError("");
    
    const found = DUMMY_SERVERS.find((s) => s.kode_qr === qrCode.trim());
    if (!found) {
      setError("Kode QR tidak dikenali. Pastikan server sudah terdaftar.");
      return;
    }
    setMatchedServer(found);
    setStep(2);
  };

  const handleSubmitPin = (e) => {
    e.preventDefault();
    setError("");
    
    if (pin.trim().length < 4) {
      setError("PIN tidak valid.");
      return;
    }
    onLoginSuccess(matchedServer);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="w-14 h-14 rounded-2xl bg-brand-accent/15 flex items-center justify-center mx-auto mb-3.5">
            <Server size={26} className="text-brand-accent" />
          </div>
          <h1 className="text-xl font-bold">Inventarisasi Aplikasi SPBE</h1>
          <p className="text-sm text-brand-dim mt-1">Kabupaten Batang</p>
        </div>

        <div className="bg-brand-panel border border-brand-border rounded-2xl p-7">
          <div className="flex gap-2 mb-5">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-brand-accent" : "bg-brand-border"}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-brand-accent" : "bg-brand-border"}`} />
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmitQr}>
              <div className="flex items-center gap-2 mb-1.5">
                <QrCode size={18} className="text-brand-accent" />
                <span className="text-sm font-semibold">Scan QR Server</span>
              </div>
              <p className="text-xs text-brand-dim mb-4">
                Arahkan kamera ke QR yang tertempel di server, atau masukkan kode manual.
              </p>

              {/* TODO: ganti placeholder ini dengan komponen kamera asli */}
              <div className="bg-brand-bg border border-dashed border-brand-border rounded-xl h-40 flex items-center justify-center mb-4">
                <span className="text-xs text-brand-dim">[ Area kamera scan QR ]</span>
              </div>

              <input
                type="text"
                placeholder="Atau ketik kode QR manual, mis: SRV-001"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg border border-brand-border bg-brand-bg text-brand-text text-sm mb-3 outline-none focus:border-brand-accent"
              />

              {error && <p className="text-brand-red text-xs mb-3">{error}</p>}

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
              <p className="text-xs text-brand-dim mb-4">
                Server: <strong>{matchedServer?.nama_server}</strong> ({matchedServer?.lokasi})
              </p>

              <input
                type="password"
                inputMode="numeric"
                placeholder="Masukkan PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg border border-brand-border bg-brand-bg text-brand-text text-sm mb-3 outline-none tracking-widest focus:border-brand-accent"
              />

              {error && <p className="text-brand-red text-xs mb-3">{error}</p>}

              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-lg border border-brand-border bg-transparent text-brand-text font-semibold text-sm cursor-pointer hover:bg-brand-border/30 transition">
                  Kembali
                </button>
                <button type="submit" className="flex-[2] py-3 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
                  Masuk
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}