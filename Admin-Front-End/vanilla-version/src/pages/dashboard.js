// Buat fungsi untuk merender konten halaman
export function renderDashboard() {
  const content = /* HTML */ `
    <div class="container">
      <div class="card">
        <h1>Selamat datang di halaman utama!</h1>
        <p>Ini adalah konten halaman utama aplikasi.</p>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}
