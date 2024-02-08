// Buat fungsi untuk merender konten halaman
function renderHomePage() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="./src/style/layout-vertical.css" />
    <aside>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/akun">Akun</a></li>
        <li><a href="/penjualan">Penjualan</a></li>
        <li><a href="/login">Logout</a></li>
      </ul>
    </aside>
    <section>
      <nav>
        <p>This is the navbar</p>
      </nav>
      <main id="content"></main>
    </section>
  `;
  document.getElementById("app").innerHTML = content;
}

// Panggil fungsi untuk merender halaman saat halaman dimuat
renderHomePage();
