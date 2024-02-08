// Buat fungsi untuk merender konten halaman
function renderHomePage() {
  const content = `
    <main id="content"></main>
      `;
  document.getElementById("app").innerHTML = content;
}

// Panggil fungsi untuk merender halaman saat halaman dimuat
renderHomePage();
