// Buat fungsi untuk merender konten halaman
export function renderDashboard() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="style/dashboard.css" />

    <div class="container">
      <div class="card" style="height: 150px">
        <img
          alt="latar"
          id="latar"
          src="/images/misc/triangle-light.png"
          class="css-84vgca"
        />
        <img
          alt="monitor"
          id="monitor"
          src="/images/misc/monitor.png"
          class="css-84vgca"
        />
        <h4 class="mt-1" style="font-weight: 500;">
          Selamat datang kembali, Admin 👋🏻
        </h4>
        <p>Hasil penjualan laptop.</p>
        <h3 class="my-4">Rp 1.000.000</h3>
        <div>
          <a href=""><button class="btn-outliner">Lihat penjualan</button></a>
        </div>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}
