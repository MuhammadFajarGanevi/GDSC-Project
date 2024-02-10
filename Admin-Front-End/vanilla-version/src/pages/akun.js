// Buat fungsi untuk merender konten halaman
export function renderAkun() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="style/akun.css" />

    <div class="container">
      <div class="card">
        <div class="row">
          <div class="col-6 col-sm-12">
            <div class="input-container">
              <input type="text" required />
              <label for="input">Nama</label>
            </div>
          </div>
          <div class="col-6 col-sm-12">
            <div class="input-container">
              <input type="text" required />
              <label for="input">Nama</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}
