const API_BASE = "http://localhost:9000/api";

function getToken() {
  return localStorage.getItem("spbe_token");
}

function setToken(token) {
  localStorage.setItem("spbe_token", token);
}

function clearToken() {
  localStorage.removeItem("spbe_token");
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Terjadi kesalahan pada server");
  }
  return data;
}

export const api = {
  login: (username, password) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  getRaks: () => apiFetch("/raks"),
  verifyRak: (kode_qr, pin) =>
    apiFetch("/raks/verify", { method: "POST", body: JSON.stringify({ kode_qr, pin }) }),
  getServersInRak: (rakId) => apiFetch(`/raks/${rakId}/servers`),
  verifyServer: (kode_qr, pin) =>
    apiFetch("/servers/verify", { method: "POST", body: JSON.stringify({ kode_qr, pin }) }),
  getAppsInServer: (serverId) => apiFetch(`/servers/${serverId}/aplikasi`),
  searchApps: (q) => apiFetch(`/aplikasi/search?q=${encodeURIComponent(q)}`),
};

export { getToken, setToken, clearToken };