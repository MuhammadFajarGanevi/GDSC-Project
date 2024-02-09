import { defineConfig } from "vite";

export default defineConfig({
  // Contoh penyesuaian aturan pemrosesan modul untuk menangani modul eksternal
  optimizeDeps: {
    include: ["sweetalert2", "axios"],
  },
  build: {
    outDir: "dist", // Direktori output build
  },
});
