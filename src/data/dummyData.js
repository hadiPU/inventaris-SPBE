export const DUMMY_USER = { username: "admin", password: "admin123" };

export const DUMMY_SERVERS = [
  { kode_qr: "SRV-001", nama_server: "Server Dinkominfo A", lokasi: "Dinas Kominfo" },
  { kode_qr: "SRV-002", nama_server: "Server Dispendukcapil", lokasi: "Dispendukcapil" },
  { kode_qr: "SRV-003", nama_server: "Server Bapenda", lokasi: "Badan Pendapatan Daerah" },
];

export const DUMMY_APPS = [
  { id: 1, nama_aplikasi: "SIMPEG Batang", bahasa: "PHP", os: "Linux", server: "SRV-001", opd: "BKD", status: "Aktif" },
  { id: 2, nama_aplikasi: "E-Retribusi", bahasa: "Java", os: "Windows Server", server: "SRV-001", opd: "Bapenda", status: "Aktif" },
  { id: 3, nama_aplikasi: "SIAK Terpadu", bahasa: "Python", os: "Linux", server: "SRV-002", opd: "Dispendukcapil", status: "Nonaktif" },
];