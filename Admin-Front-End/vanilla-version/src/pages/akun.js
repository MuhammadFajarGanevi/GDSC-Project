import AxiosAction from "../actions/AxiosAction";
import { lockIcon } from "../icons/IconsRepository";

// Buat fungsi untuk merender konten halaman
export async function renderAkun() {
  // const response = await AxiosAction.get()

  const content = /* HTML */ `
    <link rel="stylesheet" href="style/akun.css" />

    <div class="container">
      <div class="card mt-4">
        <img alt="latar" id="latar" src="/images/pages/costume-pose-m-1.png" />
        <div class="col-6">
          <h4 class="my-5">Kelola Informasi Akun</h4>
          <div class="input-container">
            <input type="text" required id="name" />
            <label for="name">Nama Lengkap</label>
          </div>
          <div class="input-container">
            <input type="text" required id="alamat" />
            <label for="alamat">Alamat</label>
          </div>
          <div class="input-container">
            <input type="text" required id="no_telp" />
            <label for="no_telp">Nomor Telepon</label>
          </div>
          <button class="btn">Simpan perubahan</button>
        </div>
      </div>
      <div class="card mt-4">
        <h4 class="mb-5">Kelola Kata sandi</h4>
        <div id="passbox-1" class="col">
          <div class="d-flex jc-center">
            <button class="btn" id="show-ubah-password">${lockIcon}</button>
          </div>
          <div class="d-flex jc-center">
            <div style="max-width: 700px">
              <p class="text-center my-3"><b>Click Untuk ubah Password</b></p>
              <p class="text-center mb-5">
                Pemeliharaan keamanan akun merupakan upaya yang baik untuk
                menjaga asset berharga serta data pribadi anda
              </p>
            </div>
          </div>
        </div>
        <div id="passbox-2" class="passbox-inactive">
          <div class="input-container">
            <input type="text" required id="password_lama" />
            <label for="password_lama">Password Lama</label>
          </div>
          <div class="input-container">
            <input type="text" required id="password_baru" />
            <label for="password_baru">Password Baru</label>
          </div>
          <div class="input-container">
            <input type="text" required id="konfirmasi_password" />
            <label for="konfirmasi_password">Konfirmasi Password</label>
          </div>
          <button class="btn">Ubah Password</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;

  setListener();
}

function setListener() {
  document
    .getElementById("show-ubah-password")
    .addEventListener("click", () => {
      document.getElementById("passbox-1").classList.toggle("passbox-inactive");
      document.getElementById("passbox-2").classList.toggle("passbox-inactive");
    });
}
