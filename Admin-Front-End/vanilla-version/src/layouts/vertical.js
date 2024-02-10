// Buat fungsi untuk merender konten halaman
function renderHomePage() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="./src/style/layout-vertical.css" />
    <aside>
      <ul>
        <li>
          <a href="/">
            <div>
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="HomeOutlineIcon"
              >
                <path
                  d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22"
                ></path>
              </svg>
            </div>
            Home
          </a>
        </li>
        <li>
          <a href="/akun">
            <div>
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="HomeOutlineIcon"
              >
                <path
                  d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22"
                ></path>
              </svg>
            </div>
            Akun
          </a>
        </li>
        <li>
          <a href="/penjualan">
            <div>
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="HomeOutlineIcon"
              >
                <path
                  d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22"
                ></path>
              </svg>
            </div>
            Penjualan
          </a>
        </li>
        <li>
          <a href="/login">
            <div>
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="HomeOutlineIcon"
              >
                <path
                  d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22"
                ></path>
              </svg>
            </div>
            Logout
          </a>
        </li>
      </ul>
    </aside>
    <section>
      <nav>
        <p>This is the navbar</p>
      </nav>
      <main id="content"></main>
    </section>
  `;
  document.getElementById("app").innerHTML = content;
}

// Panggil fungsi untuk merender halaman saat halaman dimuat
renderHomePage();
