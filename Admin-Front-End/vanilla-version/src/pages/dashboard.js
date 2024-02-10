// Buat fungsi untuk merender konten halaman
export function renderDashboard() {
  const content = `
      <h1>Selamat datang di halaman utama!</h1>
      <p>Ini adalah konten halaman utama aplikasi.</p>
    `;
  document.getElementById("content").innerHTML = content;
}
