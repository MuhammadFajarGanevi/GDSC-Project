// Buat fungsi untuk merender konten halaman
export function renderAkun() {
  const content = /* HTML */ `
    <div class="container">
      <div class="card col">
        <h4 class="h2 mb-5">Kelola identitas akun</h4>
        <div class="col-6">
          <div class="input-container">
            <input type="text" id="name" />
            <label for="name">Nama Lengkap</label>
          </div>
        </div>
        <div class="col-6">
          <div class="input-container">
            <input type="text" id="alamat" />
            <label for="alamat">Alamat</label>
          </div>
        </div>
        <div class="col-6">
          <div class="input-container">
            <input type="text" id="no_telp" />
            <label for="no_telp">Nomor Telepon</label>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}
