import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 9003,
    cors: true,
    origin: "http://localhost:9003",
  },
  build: {
    rollupOptions: {
      input: "src/xerris-calendar-app.ts",
      output: {
        format: "systemjs",
        entryFileNames: "[name].js",
      },
    },
  },
});
