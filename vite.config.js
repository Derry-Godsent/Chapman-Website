import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    sourcemap: false,
  },
  css: {
    devSourcemap: false,
  },
});