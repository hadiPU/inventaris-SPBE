export const DUMMY_USER = { username: "admin", password: "admin123" };

export const DUMMY_RAKS = [
  { kode_qr: "RAK-A", nama_rak: "Rak A", lokasi: "Lemari Sebelah Kanan" },
  { kode_qr: "RAK-B", nama_rak: "Rak B", lokasi: "Lemari Sebelah Kiri" },
];

export const DUMMY_SERVERS = [
  { kode_qr: "SRV-001", nama_server: "Server Dinkominfo A", rak: "RAK-A" },
  { kode_qr: "SRV-002", nama_server: "Server Dispendukcapil", rak: "RAK-A" },
  { kode_qr: "SRV-003", nama_server: "Server Bapenda", rak: "RAK-B" },
];

export const DUMMY_APPS = [
  { id: 1, nama_aplikasi: "SIMPEG Batang", bahasa: "PHP", os: "Linux", server: "SRV-001", opd: "BKD", status: "Aktif" },
  { id: 2, nama_aplikasi: "E-Retribusi", bahasa: "Java", os: "Windows Server", server: "SRV-001", opd: "Bapenda", status: "Aktif" },
  { id: 3, nama_aplikasi: "SIAK Terpadu", bahasa: "Python", os: "Linux", server: "SRV-002", opd: "Dispendukcapil", status: "Nonaktif" },
  { id: 4, nama_aplikasi: "E-Pajak Daerah", bahasa: "PHP", os: "Linux", server: "SRV-003", opd: "Bapenda", status: "Aktif" },
];