/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 9003,
    cors: true,
    origin: "http://localhost:9003",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup-test.ts",
  },
  build: {
    rollupOptions: {
      input: "src/xerris-calendar-app.ts",
      preserveEntrySignatures: "exports-only",
      output: {
        format: "system",
        entryFileNames: "[name].js",
      },
      external: ["react", "react-dom", "single-spa"],
    },
  },
});
