import { routes } from "./src/navigation/routes.js";
import "./style.css";
import "./color.css";

async function renderPage(path) {
  // Ambil data rute yang sesuai
  const route = routes[path];

  // Pastikan rute ditemukan
  if (!route) {
    console.error("404 - Halaman tidak ditemukan");
    return;
  }

  const content = document.getElementById("app");

  // Ambil konten layout
  const layoutResponse = await fetch(`./src/layouts/${route.layout}`);
  const layoutContent = await layoutResponse.text();

  // Render layout
  const scriptLayout = document.createElement("script");
  scriptLayout.textContent = layoutContent;
  content.appendChild(scriptLayout);

  // Ambil konten halaman
  const pageResponse = await fetch(`./src/pages/${route.script}`);
  const pageContent = await pageResponse.text();

  // Render konten halaman
  const scriptContent = document.createElement("script");
  scriptContent.textContent = pageContent;
  content.appendChild(scriptContent);
}

function navigate() {
  const path = window.location.pathname;
  renderPage(path);
}

window.addEventListener("popstate", navigate);
window.addEventListener("DOMContentLoaded", navigate);
