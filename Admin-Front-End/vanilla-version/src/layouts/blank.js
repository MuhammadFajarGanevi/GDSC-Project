// Buat fungsi untuk merender konten halaman
export function renderBlank() {
  const content = `
    <main id="content" class="d-flex jc-center a-center"></main>
      `;
  document.getElementById("app").innerHTML = content;
}
