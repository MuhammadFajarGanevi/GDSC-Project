import AxiosAction from "../actions/AxiosAction";
import Swal from "sweetalert2";

function render() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="./src/style/login.css" />

    <img alt="tree" id="tanaman-kanan" src="/images/pages/auth-v1-tree-2.png" />

    <img alt="tree" id="tanaman-kiri" src="/images/pages/auth-v1-tree.png" />

    <img
      alt="latar"
      id="latar"
      src="/images/pages/auth-v1-mask-light.png"
      class="css-84vgca"
    />

    <div class="flex-d-col card">
      <div class="row mb-5">
        <div class="col-5 d-flex jc-right">
          <img id="logo" class="mr-3" src="logo.png" />
        </div>
        <div class="col-7 d-flex jc-left a-center">
          <h3>LAPTOPERS</h3>
        </div>
      </div>
      <div>
        <h4 class="mb-1">Login</h4>
        <p class="mb-3">Silakan login untuk melakukan pembelian di Laptopers</p>
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
      <button class="mb-5" id="submitButton">Login</button>
      <div class="row ml-1">
        <div class="mr-2">
          <a href="/register">Buat akun baru</a>
        </div>
        |
        <div class="ml-2">
          <a href="/">Lupa Password</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById("content").innerHTML = content;

  setListener();
}

function setListener() {
  document.getElementById("submitButton").addEventListener("click", login);
}

render();

// Script

async function login() {
  try {
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    const response = await AxiosAction.post("/auth/login", data);

    localStorage.setItem(
      "jwtToken",
      `Bearer ${response.data.result.accessToken}`
    );
    localStorage.setItem("email", data.email);

    window.location.href = "/";
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