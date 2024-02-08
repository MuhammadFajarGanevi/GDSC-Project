import axios from "axios";

function renderHomePage() {
  const content = `
<link rel="stylesheet" href="./src/style/login.css" />

<img alt="tree" id="tanaman-kanan" src="/images/pages/auth-v1-tree-2.png">

<img alt="tree" id="tanaman-kiri" src="/images/pages/auth-v1-tree.png">

<img alt="latar" id="latar" src="/images/pages/auth-v1-mask-light.png" class="css-84vgca">

<div class="flex-d-col card">
  <form novalidate="" autocomplete="off" onsubmit="login(event)">
    <div class="row mb-5">
      <div class="col-5 d-flex jc-right">
        <img id="logo" class="mr-3" src="logo.png">
      </div>
      <div class="col-7 d-flex jc-left a-center">
        <h3>LAPTOPERS</h3>
      </div>
    </div>
    <div>
      <h4 class="mb-1">Login web Laptopers</h4>
      <p class="mb-3">Silakan login untuk melakukan pembelian di Laptopers</p>
    </div>
    <div class="mb-3">
      <label>Email</label>
      <div>
        <input>
      </div>
    </div>
    <div class="mb-3">
      <label>Password</label>
      <div>
        <input>
      </div>
    </div>
    <button class="mb-5">Login</button>
    <div class="row ml-1">
      <div class="mr-2">
        <a href="/register">Buat akun baru</a>
      </div>
      |
      <div class="ml-2">
        <a href="/">Lupa Password</a>
      </div>
    </div>
  </form>
</div>
      `;

  document.getElementById("content").innerHTML = content;
}

renderHomePage();

async function login(event) {
  event.preventDefault();

  const response = await axios.post("");

  window.location.href = "/";
}
