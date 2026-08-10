import React, { useState } from "react";
import { LogIn, User, Lock } from "lucide-react";
import { DUMMY_USER } from "../data/dummyData";

export default function NormalLoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      onLoginSuccess({ username });
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="w-14 h-14 rounded-2xl bg-brand-accent/15 flex items-center justify-center mx-auto mb-3.5">
            <LogIn size={26} className="text-brand-accent" />
          </div>
          <h1 className="text-xl font-bold">Inventarisasi Aplikasi SPBE</h1>
          <p className="text-sm text-brand-dim mt-1">Kabupaten Batang</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-brand-panel border border-brand-border rounded-2xl p-7">
          <div className="mb-3">
            <label className="text-xs text-brand-dim mb-1.5 block">Username</label>
            <div className="flex items-center gap-2 border border-brand-border rounded-lg px-3.5 py-3 bg-brand-bg">
              <User size={15} className="text-brand-dim" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent outline-none text-sm w-full text-brand-text"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-brand-dim mb-1.5 block">Password</label>
            <div className="flex items-center gap-2 border border-brand-border rounded-lg px-3.5 py-3 bg-brand-bg">
              <Lock size={15} className="text-brand-dim" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none text-sm w-full text-brand-text"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          {error && <p className="text-brand-red text-xs mb-3">{error}</p>}

          <button type="submit" className="w-full py-3 rounded-lg bg-brand-accent text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition">
            Masuk
          </button>

          <p className="text-xs text-brand-dim text-center mt-4">
            (Demo: admin / admin123)
          </p>
        </form>
      </div>
    </div>
  );
}