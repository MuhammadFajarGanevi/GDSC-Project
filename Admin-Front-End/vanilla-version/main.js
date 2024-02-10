import { routes } from "./src/navigation/routes.js";
import "./style.css";
import "./color.css";

async function renderPage(path) {
  // Ambil data rute yang sesuai
  const route = routes[path];

  // Pastikan rute ditemukan
  if (!route) {
    window.location.href = "404.html";
  }

  // Ambil konten layout
  const layoutResponse = await fetch(`./src/layouts/${route.layout}`);
  const layoutContent = await layoutResponse.text();

  // Render layout
  const scriptLayout = document.createElement("script");
  scriptLayout.textContent = layoutContent;
  document.head.appendChild(scriptLayout);

  // Ambil konten halaman
  const pageResponse = await fetch(`./src/pages/${route.script}`);
  const pageContent = await pageResponse.text();

  // Render konten halaman
  const scriptContent = document.createElement("script");
  scriptContent.textContent = pageContent;
  scriptContent.type = "module";
  document.head.appendChild(scriptContent);
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
