import AxiosAction from "../actions/AxiosAction";
import Swal from "sweetalert2";

export function renderRegister() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="style/login.css" />

    <img alt="tree" id="tanaman-kanan" src="/images/pages/auth-v1-tree-2.png" />

    <img alt="tree" id="tanaman-kiri" src="/images/pages/auth-v1-tree.png" />

    <img
      alt="latar"
      id="latar"
      src="/images/pages/auth-v1-mask-light.png"
      class="css-84vgca"
    />

    <div class="container">
      <div class="flex-d-col card">
        <div class="row mb-5">
          <div class="col-5 d-flex jc-right">
            <img class="mr-3" height="60" src="logo.png" />
          </div>
          <div class="col-7 d-flex jc-left a-center">
            <h3>LAPTOPERS</h3>
          </div>
        </div>
        <div>
          <h4 class="mb-1">Registrasi</h4>
          <p class="mb-3">Daftar untuk akses berbagai fitur tambahan</p>
        </div>
        <div class="mb-3">
          <label>Nama Lengkap</label>
          <div>
            <input id="name" />
          </div>
        </div>
        <div class="mb-3">
          <label>Email</label>
          <div>
            <input id="email" />
          </div>
        </div>
        <div class="mb-3">
          <label>Password</label>
          <div>
            <input id="password" />
          </div>
        </div>
        <div class="mb-3">
          <label>Alamat</label>
          <div>
            <input id="alamat" />
          </div>
        </div>
        <div class="mb-3">
          <label>Nomor Telepon</label>
          <div>
            <input id="no_telp" />
          </div>
        </div>
        <button class="mb-5 btn" id="submitButton">submit</button>
        <div class="row ml-1">
          <div class="mr-2">
            <a href="/login">Sudah punya akun</a>
          </div>
          |
          <div class="ml-2">
            <a href="/">Lupa Password</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("content").innerHTML = content;

  setListener();
}

function setListener() {
  document.getElementById("submitButton").addEventListener("click", register);
}

async function register() {
  try {
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      alamat: document.getElementById("alamat").value,
      no_telp: document.getElementById("no_telp").value,
    };
    const response = await AxiosAction.post("/user/signup", data);

    console.log(response);

    await Swal.fire({
      toast: true,
      position: "top",
      iconColor: "white",
      color: "white",
      background: "var(--success)",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      icon: "success",
      title: "Akun berhasil ditambahkan",
    });

    // window.location.href = "/login";
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top",
      iconColor: "white",
      color: "white",
      background: "var(--error)",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      icon: "error",
      title: "Email atau Password salah",
    });
  }
}
