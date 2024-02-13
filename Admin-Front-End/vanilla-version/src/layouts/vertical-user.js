import {
  homeIcon,
  userIcon,
  cartIcon,
  logOutIcon,
  menuIcon,
  listIcon,
} from "../icons/IconsRepository";
import AxiosAction from "../actions/AxiosAction";
import Swal from "sweetalert2";

const navbarItem = [
  {
    nama: "Dashboard",
    to: "/user",
    icon: homeIcon,
  },
  {
    nama: "Akun",
    to: "/akun",
    icon: userIcon,
  },
  {
    nama: "Keranjang",
    to: "/keranjang",
    icon: cartIcon,
  },
  {
    nama: "Pembelian",
    to: "/pembelian",
    icon: listIcon,
  },
];

const path = window.location.pathname;
const email = localStorage.getItem("email");

export function renderVericalUser() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="style/layout-vertical.css" />
    <aside class="col">
      <div class="flex-d-col mt-4">
        <div class="row">
          <div class="col-4 ml-3 d-flex jc-right" style="padding-right:0;">
            <img height="55" src="logo.webp" />
          </div>
          <div class="col-8 d-flex jc-left a-center ml-2">
            <h4>LAPTOPERS</h4>
          </div>
        </div>
      </div>
      <ul>
        ${navbarItem
          .map(
            (item) => /* HTML */ `
              <li>
                <a href="${item.to}" class="${path == item.to ? "active" : ""}">
                  <div class="icon">${item.icon}</div>
                  <p>${item.nama}</p>
                </a>
              </li>
            `
          )
          .join("")}
        <li>
          <a id="logoutButton">
            <div class="icon">${logOutIcon}</div>
            <p>Logout</p>
          </a>
        </li>
      </ul>
    </aside>
    <section>
      <nav>
        <div class="container">
          <div class="d-flex jc-left">
            <div class="menu">${menuIcon}</div>
          </div>
          <div class="d-flex">${email}</div>
        </div>
      </nav>
      <main id="content"></main>
    </section>
  `;
  document.getElementById("app").innerHTML = content;

  setListener();
}

function setListener() {
  const sideBar = document.querySelector("aside");
  const menuButton = document.querySelector(".menu");

  document
    .getElementById("logoutButton")
    .addEventListener("click", async () => {
      const ask = await Swal.fire({
        title: "Ingin keluar dari akun ini?",
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: "Log Out",
        denyButtonColor: "var(--error)",
        cancelButtonColor:
          "rgba(var(--shadow-r),var(--shadow-g),var(--shadow-b), 0.65)",
      });
      if (ask.isDenied) {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await AxiosAction.post(
          "/auth/logout",
          { email: email },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );

        localStorage.clear();
        window.location.href = "/login";
      }
    });

  menuButton.addEventListener("click", async () => {
    menuButton.classList.toggle("menu-active");
    sideBar.classList.toggle("sidebar-active");
  });
}
