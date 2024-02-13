import { renderVericalUser } from "../layouts/vertical-user";
import { renderBlank } from "../layouts/blank";
import { renderDashboardUser } from "../pages/dashboard-user";
import { renderLogin } from "../pages/login-user";
import { renderRegister } from "../pages/register";
import { renderPenjualan } from "../pages/penjualan";
import { renderAkun } from "../pages/akun";
import { renderPembelian } from "../pages/pembelian";
import { renderKeranjang } from "../pages/keranjang";

// vanilla router
export const routes = {
  "/penjualan": {
    page: renderPenjualan,
    layout: renderVericalUser,
    role: "admin",
  },
  "/user": {
    page: renderDashboardUser,
    layout: renderVericalUser,
    role: "user",
  },
  "/akun": {
    page: renderAkun,
    layout: renderVericalUser,
    role: "user",
  },
  "/keranjang": {
    page: renderKeranjang,
    layout: renderVericalUser,
    role: "user",
  },
  "/pembelian": {
    page: renderPembelian,
    layout: renderVericalUser,
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
