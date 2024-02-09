// Buat fungsi untuk merender konten halaman
function renderHomePage() {
  const content = `
    <main id="content" class="d-flex jc-center a-center"></main>
      `;
  document.getElementById("app").innerHTML = content;
}

// Panggil fungsi untuk merender halaman saat halaman dimuat
renderHomePage();
