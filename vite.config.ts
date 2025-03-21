import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
