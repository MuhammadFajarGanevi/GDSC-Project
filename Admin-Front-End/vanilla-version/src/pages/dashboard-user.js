// Buat fungsi untuk merender konten halaman
export function renderDashboardUser() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="style/dashboard-user.css" />

    <div class="container">
      <div class="card mt-4">
        <img alt="latar" id="latar" src="/images/pages/pose-m-2.png" />
        <div class="col-6">
          <h4 class="mt-1 h2" style="font-weight: 500;">
            Selamat datang kembali 👋🏻
          </h4>
          <p class="mt-5">
            Laptopers adalah web penjualan laptop 💻 terbaik yang menyediakan
            berbagai laptop kualitas tertinggi dengan harga yang tentunya sangat
            terjangkau, tertarik? mari menjelajah 🚀
          </p>
        </div>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}
