import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import EnvironmentPlugin from "vite-plugin-environment"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), EnvironmentPlugin("all")],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
