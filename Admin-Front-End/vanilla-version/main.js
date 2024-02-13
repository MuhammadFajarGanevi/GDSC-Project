import { routes } from "./src/navigation/routes.js";
import { roleValidated } from "./src/actions/AuthorizationAction.js";

async function renderPage(path) {
  // Ambil data rute yang sesuai
  const route = routes[path];

  // Pastikan rute ditemukan
  if (!route) {
    window.location.href = "/404.html";
  }

  roleValidated(localStorage.getItem("role"), route.role);

  // Ambil konten layout
  route.layout();

  // Ambil konten halaman
  route.page();
}

async function navigate() {
  const path = window.location.pathname;
  await renderPage(path);

  setTimeout(function () {
    document.getElementById("loaderContainer").remove();
  }, 50);
}

window.addEventListener("popstate", navigate);
window.addEventListener("DOMContentLoaded", navigate);
