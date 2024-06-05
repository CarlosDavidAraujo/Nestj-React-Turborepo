import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  base: "/client",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
  optimizeDeps: {
    include: ["@repo/contracts/**/*"],
  },
  preview: {
    port: parseInt(process.env.PORT!),
    strictPort: true,
  },
  server: {
    port: parseInt(process.env.PORT!),
    strictPort: true,
    host: true,
    origin: `http://0.0.0.0:${process.env.PORT}`,
    proxy: {
      "/api": {
        target: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
