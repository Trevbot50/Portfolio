// @ts-nocheck
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        shakeMyHand: resolve(rootDir, "shake-my-hand/index.html"),
        experienceProjects: resolve(rootDir, "experience-projects/index.html"),
      },
    },
  },
})