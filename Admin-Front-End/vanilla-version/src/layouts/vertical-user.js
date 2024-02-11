import {
  homeIcon,
  userIcon,
  cartIcon,
  logOutIcon,
  menuIcon,
} from "../icons/sideBarIcons";
import AxiosAction from "../actions/AxiosAction";

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
    nama: "Pembelian",
    to: "/pembelian",
    icon: cartIcon,
  },
];

const path = window.location.pathname;

export function renderVericalUser() {
  const content = /* HTML */ `
    <link rel="stylesheet" href="style/layout-vertical.css" />
    <aside class="col">
      <div class="flex-d-col mt-4">
        <div class="row">
          <div class="col-3 ml-3 d-flex jc-right" style="padding-right:0;">
            <img height="55" src="logo.png" />
          </div>
          <div class="col-9 d-flex jc-left a-center">
            <h5>LAPTOPERS</h5>
          </div>
        </div>
      </div>
      <ul>
        ${navbarItem
          .map((item) => {
            return /* HTML */ `<li>
              <a href="${item.to}" class="${path == item.to ? "active" : ""}">
                <div class="icon">${item.icon}</div>
                <p>${item.nama}</p>
              </a>
            </li>`;
          })
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
          <div class="d-flex">user profile</div>
        </div>
      </nav>
      <main id="content"></main>
    </section>
  `;
  document.getElementById("app").innerHTML = content;

  setListener();
}

function setListener() {
  document
    .getElementById("logoutButton")
    .addEventListener("click", async () => {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = AxiosAction.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );

      console.log(response);
    });
}
