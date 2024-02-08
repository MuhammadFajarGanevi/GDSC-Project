// Buat fungsi untuk merender konten halaman
function renderHomePage() {
  const content = `
<div>
  <div>
    <img src="logo.png">
    <h6>Laptopers</h6>
  </div>
  <div>
    <h5>Login web Laptopers</h5>
    <p>Silakan login untuk melakukan pembelian di Laptopers</p>
  </div>
  <form novalidate="" autocomplete="off">
    <div>
      <label>Email</label>
      <div>
        <input>
      </div>
    </div>
    <div>
      <label>Password</label>
      <div>
        <input>
      </div>
    </div>
    <button>Login<span></span></button>
    <div>
      <div>
        <a href="/register">Buat akun baru</a>
      </div>
      |
      <div>
        <a href="/">Lupa Password</a>
      </div>
    </div>
  </form>
</div>
      `;
  document.getElementById("content").innerHTML = content;
}

// Panggil fungsi untuk merender halaman saat halaman dimuat
renderHomePage();
