import { renderVerical } from "../layouts/vertical";
import { renderBlank } from "../layouts/blank";
import { renderDashboard } from "../pages/dashboard";
import { renderLogin } from "../pages/login";
import { renderRegister } from "../pages/register";
import { renderPenjualan } from "../pages/penjualan";
import { renderAkun } from "../pages/akun";

// vanilla router
export const routes = {
  "/": {
    page: renderDashboard,
    layout: renderVerical,
    role: "user",
  },
  "/akun": {
    page: renderAkun,
    layout: renderVerical,
    role: "user",
  },
  "/penjualan": {
    page: renderPenjualan,
    layout: renderVerical,
    role: "user",
  },
  "/login": {
    page: renderLogin,
    layout: renderBlank,
    role: "guest",
  },
  "/register": {
    page: renderRegister,
    layout: renderBlank,
    role: "guest",
  },
};
