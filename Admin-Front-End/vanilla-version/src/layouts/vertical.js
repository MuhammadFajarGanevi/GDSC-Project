// Buat fungsi untuk merender konten halaman
function renderHomePage() {
  const content = `
  <header>
    <!-- Navbar content here -->
    <nav>
      <ul>
        <li><a href="#/">Home</a></li>
        <li><a href="#/akun">Akun</a></li>
        <li><a href="#/penjualan">Penjualan</a></li>
      </ul>
    </nav>
  </header>
  <aside>
    <!-- Sidebar content here -->
    <p>This is the sidebar</p>
  </aside>
  <main id="content"></main>
    `;
  document.getElementById("app").innerHTML = content;
}

// Panggil fungsi untuk merender halaman saat halaman dimuat
renderHomePage();
