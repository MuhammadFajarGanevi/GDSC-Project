// Buat fungsi untuk merender konten halaman
function renderHomePage() {
  const content = `
      <h1>Selamat datang di halaman utama!</h1>
      <p>Ini adalah konten halaman utama aplikasi.</p>
    `;
  document.getElementById("content").innerHTML = content;
}

// Panggil fungsi untuk merender halaman saat halaman dimuat
renderHomePage();
