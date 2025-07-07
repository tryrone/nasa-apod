import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true,
    },
  },
  resolve: {
    alias: {
      // @ts-ignore
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
