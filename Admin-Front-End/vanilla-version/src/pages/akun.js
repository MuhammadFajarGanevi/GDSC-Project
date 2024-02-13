import AxiosAction from "../actions/AxiosAction";
import { lockIcon } from "../icons/IconsRepository";
import Swal from "sweetalert2";

const jwtToken = localStorage.getItem("jwtToken");

// Buat fungsi untuk merender konten halaman
export async function renderAkun() {
  try {
    const response = await AxiosAction.get("/user/user", {
      headers: {
        Authorization: jwtToken,
      },
    });

    console.log(response.data);
    const dataUser = response.data.result[0];

    const content = /* HTML */ `
      <link rel="stylesheet" href="style/akun.css" />

      <div class="container">
        <h3>${dataUser.email}</h3>
        <div class="card mt-4">
          <img
            alt="latar"
            id="latar"
            src="/images/pages/costume-pose-m-1.png"
          />
          <div class="col-6">
            <h4 class="my-5">Kelola Informasi Akun</h4>
            <div class="input-container">
              <input type="text" required id="name" value="${dataUser.name}" />
              <label for="name">Nama Lengkap</label>
            </div>
            <div class="input-container">
              <input
                type="text"
                required
                id="alamat"
                value="${dataUser.address}"
              />
              <label for="alamat">Alamat</label>
            </div>
            <div class="input-container">
              <input
                type="text"
                required
                id="no_telp"
                value="${dataUser.phone_number}"
              />
              <label for="no_telp">Nomor Telepon</label>
            </div>
            <button class="btn" id="submit-data">Simpan perubahan</button>
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
            <button class="btn" id="submit-password">Ubah Password</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("content").innerHTML = content;

    setListener();
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }
}

function setListener() {
  document
    .getElementById("show-ubah-password")
    .addEventListener("click", () => {
      document.getElementById("passbox-1").classList.toggle("passbox-inactive");
      document.getElementById("passbox-2").classList.toggle("passbox-inactive");
    });
  document
    .getElementById("submit-data")
    .addEventListener("click", async (element) => {
      document.getElementById("submit-data").classList.add("btn-inactive");
      try {
        const data = {
          userId: localStorage.getItem("id"),
          name: document.getElementById("name").value,
          alamat: document.getElementById("alamat").value,
          no_telp: document.getElementById("no_telp").value,
        };

        if (
          data.name.length < 1 ||
          data.alamat.length < 1 ||
          data.no_telp.length < 1
        ) {
          Swal.fire({
            toast: true,
            position: "top",
            iconColor: "white",
            color: "white",
            background: "var(--error)",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            icon: "error",
            title: "Lengkapi data!",
          });

          setTimeout(function () {
            document
              .getElementById("submit-data")
              .classList.remove("btn-inactive");
          }, 500);
          return;
        }
        const response = await AxiosAction.put("/user", data, {
          headers: {
            Authorization: jwtToken,
          },
        });

        Swal.fire({
          toast: true,
          position: "top",
          iconColor: "white",
          color: "white",
          background: "var(--success)",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: "success",
          title: "Data akun berhasil diubah",
        });
      } catch (error) {
        if (error.response.status == 401) {
          localStorage.clear();
          window.location.href = "/401.html";
        }
        if (error.response.status == 500) {
          localStorage.clear();
          window.location.href = "/500.html";
        }
      }

      setTimeout(function () {
        document.getElementById("submit-data").classList.remove("btn-inactive");
      }, 500);
    });
  document
    .getElementById("submit-password")
    .addEventListener("click", async () => {
      document.getElementById("submit-password").classList.add("btn-inactive");
      try {
        const data = {
          oldPassword: document.getElementById("password_lama").value,
          newPassword: document.getElementById("password_baru").value,
          confirmPassword: document.getElementById("konfirmasi_password").value,
        };
        const response = await AxiosAction.post("/auth/reset-password", data, {
          headers: {
            Authorization: jwtToken,
          },
        });

        Swal.fire({
          toast: true,
          position: "top",
          iconColor: "white",
          color: "white",
          background: "var(--success)",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: "success",
          title: "Password berhasil diperbarui",
        });
        document
          .getElementById("passbox-1")
          .classList.toggle("passbox-inactive");
        document
          .getElementById("passbox-2")
          .classList.toggle("passbox-inactive");
      } catch (error) {
        Swal.fire({
          toast: true,
          position: "top",
          iconColor: "white",
          color: "white",
          background: "var(--error)",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
          icon: "error",
          title: error.response.data.message,
        });
        if (error.response.status == 401) {
          localStorage.clear();
          window.location.href = "/401.html";
        }
        if (error.response.status == 500) {
          localStorage.clear();
          window.location.href = "/500.html";
        }
      }

      setTimeout(function () {
        document
          .getElementById("submit-password")
          .classList.remove("btn-inactive");
      }, 500);
    });
}
